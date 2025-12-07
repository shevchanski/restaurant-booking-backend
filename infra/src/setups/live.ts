import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';

import ecsParams from '../../ecs-params.json';

import { AWS_SERVICES, AwsUtil } from '../utils/aws';

const stack = pulumi.getStack();
const appConfig = new pulumi.Config('app');

const APP_NAME = appConfig.require('name');
const ECS_PORT = 3000;

const RESOURCE_PREFIX = `${APP_NAME}-${stack}`;

const region = aws.config.region || 'eu-north-1';

const awsIdentity = pulumi.output(aws.getCallerIdentity({}));

const awsUtil = new AwsUtil({ region, awsIdentity });

const paramScope = `/${APP_NAME}/${stack}`;

const ecsParamsDefinition = ecsParams.map((paramName) => {
  return {
    name: paramName,
    valueFrom: `${paramScope}/${paramName}`,
  };
});

const repo = new awsx.ecr.Repository(`${RESOURCE_PREFIX}-repo`, {
  forceDelete: true,
});

const image = new awsx.ecr.Image(`${RESOURCE_PREFIX}-image`, {
  repositoryUrl: repo.url,
  context: '../',
  platform: 'linux/amd64',
});

const loadBalancer = new awsx.lb.ApplicationLoadBalancer(
  `${RESOURCE_PREFIX}-lb`,
);

// ECS кластер
const cluster = new aws.ecs.Cluster(`${RESOURCE_PREFIX}-cluster`, {});

// IAM: роль виконання (execution role) — читає S3 env-file, Secrets Manager і SSM
const execRole = new aws.iam.Role(`${RESOURCE_PREFIX}-exec-role`, {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: 'ecs-tasks.amazonaws.com',
  }),
});

// Managed policy для ECS execution
new aws.iam.RolePolicyAttachment(`${RESOURCE_PREFIX}-exec-managed`, {
  role: execRole.name,
  policyArn: aws.iam.ManagedPolicy.AmazonECSTaskExecutionRolePolicy,
});

const paramsArnPrefix = awsUtil.createArtForService(
  AWS_SERVICES.SSM,
  `${paramScope}/*`,
);

// Дозволи на S3/Secrets/SSM для підвантаження конфігів і секретів
new aws.iam.RolePolicy(`${RESOURCE_PREFIX}-exec-inline`, {
  role: execRole.name,
  policy: pulumi.all([paramsArnPrefix]).apply(
    ([paramsArn]) =>
      aws.iam.getPolicyDocumentOutput({
        statements: [
          {
            effect: 'Allow',
            actions: ['ssm:GetParameter', 'ssm:GetParameters', 'kms:Decrypt'],
            resources: [paramsArn],
          },
        ],
      }).json,
  ),
});

// Task role (додайте доступи, якщо ваш застосунок звертається до AWS API)
const taskRole = new aws.iam.Role(`${RESOURCE_PREFIX}-task-role`, {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: 'ecs-tasks.amazonaws.com',
  }),
});

const logGroup = pulumi.output(
  new aws.cloudwatch.LogGroup(`${RESOURCE_PREFIX}-lg`, {
    name: `/ecs/${APP_NAME}-${stack}`,
    retentionInDays: 30,
  }),
);

const logGroupArnWithStreams = logGroup.apply((lg) =>
  awsUtil.createArtForService(AWS_SERVICES.LOGS, `${lg.name}:*`),
);

const execLogPolicy = aws.iam.getPolicyDocumentOutput({
  statements: [
    {
      effect: 'Allow',
      actions: [
        'logs:CreateLogStream',
        'logs:PutLogEvents',
        'logs:DescribeLogStreams',
      ],
      resources: [logGroupArnWithStreams],
    },
  ],
}).json;

new aws.iam.RolePolicy(`${RESOURCE_PREFIX}-exec-logs`, {
  role: execRole.name,
  policy: execLogPolicy,
});

// Опис контейнера з environmentFiles і secrets
const container = pulumi
  .all([logGroup.name, image, loadBalancer])
  .apply(([lgName, image, lb]) =>
    JSON.stringify([
      {
        name: 'api',
        image: image.imageUri,
        essential: true,
        portMappings: [
          { containerPort: ECS_PORT, targetGroup: lb.defaultTargetGroup },
        ],
        environment: [{ name: 'NODE_ENV', value: stack }],
        secrets: [...ecsParamsDefinition],
        logConfiguration: {
          logDriver: 'awslogs',
          options: {
            'awslogs-group': lgName,
            'awslogs-region': region,
            'awslogs-stream-prefix': 'api', // префікс для потоків
          },
        },
        healthCheck: {
          command: [
            'CMD-SHELL',
            `curl -f http://localhost:${ECS_PORT}/ping || exit 1`,
          ],
          interval: 30,
          timeout: 5,
          retries: 3,
          startPeriod: 10,
        },
      },
    ]),
  );

// Task Definition (Fargate)
const task = new aws.ecs.TaskDefinition(`${RESOURCE_PREFIX}-taskdef`, {
  family: `${RESOURCE_PREFIX}-api`,
  requiresCompatibilities: ['FARGATE'],
  networkMode: 'awsvpc',
  cpu: '256',
  memory: '512',
  executionRoleArn: execRole.arn,
  taskRoleArn: taskRole.arn,
  runtimePlatform: {
    cpuArchitecture: 'X86_64',
    operatingSystemFamily: 'LINUX',
  },
  containerDefinitions: container,
});

// Мережа: дефолтний VPC і сабнети
const vpc = pulumi.output(aws.ec2.getVpc({ default: true }));
const subnets = vpc.apply((c) =>
  pulumi.output(
    aws.ec2.getSubnets({
      filters: [
        {
          name: 'vpc-id',
          values: [c.id],
        },
      ],
    }),
  ),
);

// SG для доступу на 80/tcp
const sg = new aws.ec2.SecurityGroup(`${RESOURCE_PREFIX}-sg`, {
  vpcId: vpc.id,
  ingress: [
    {
      protocol: 'tcp',
      fromPort: 80,
      toPort: 80,
      cidrBlocks: ['0.0.0.0/0'],
    },
  ],
  egress: [
    { protocol: '-1', fromPort: 0, toPort: 0, cidrBlocks: ['0.0.0.0/0'] },
  ],
});

// ECS Service без LB (для демо)
const svc = new awsx.ecs.FargateService(`${RESOURCE_PREFIX}-svc`, {
  cluster: cluster.arn,
  taskDefinition: task.arn,
  networkConfiguration: {
    assignPublicIp: true,
    subnets: subnets.ids,
    securityGroups: [sg.id],
  },
  deploymentCircuitBreaker: {
    enable: true,
    rollback: true,
  },
});

// Виводи
export const ecsCluster = cluster.name;
export const taskDef = task.arn;
export const serviceName = svc.service.name;
export const url = pulumi.interpolate`http://${loadBalancer.loadBalancer.dnsName}`;
