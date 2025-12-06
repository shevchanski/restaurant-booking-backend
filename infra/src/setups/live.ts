import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

import ecsParams from '../../ecs-params.json';

import { AWS_SERVICES, AwsUtil } from '../utils/aws';

const stack = pulumi.getStack();
const appConfig = new pulumi.Config('app');

const APP_NAME = appConfig.get('name');
const ECS_PORT = 3000;

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

// ECS кластер
const cluster = new aws.ecs.Cluster(`${APP_NAME}-${stack}-cluster`, {});

// IAM: роль виконання (execution role) — читає S3 env-file, Secrets Manager і SSM
const execRole = new aws.iam.Role(`${APP_NAME}-${stack}-exec-role`, {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: 'ecs-tasks.amazonaws.com',
  }),
});

// Managed policy для ECS execution
new aws.iam.RolePolicyAttachment(`${APP_NAME}-${stack}-exec-managed`, {
  role: execRole.name,
  policyArn: aws.iam.ManagedPolicy.AmazonECSTaskExecutionRolePolicy,
});

const paramsArnPrefix = awsUtil.createArtForService(
  AWS_SERVICES.SSM,
  `${paramScope}/*`,
);

// Дозволи на S3/Secrets/SSM для підвантаження конфігів і секретів
new aws.iam.RolePolicy(`${APP_NAME}-${stack}-exec-inline`, {
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
const taskRole = new aws.iam.Role(`${APP_NAME}-${stack}-task-role`, {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: 'ecs-tasks.amazonaws.com',
  }),
});

// Опис контейнера з environmentFiles і secrets
const container = JSON.stringify([
  {
    name: 'api',
    image:
      appConfig.get('image') || 'public.ecr.aws/amazonlinux/amazonlinux:latest',
    essential: true,
    portMappings: [{ containerPort: ECS_PORT }],
    environment: [{ name: 'NODE_ENV', value: stack }],
    secrets: [...ecsParamsDefinition],
  },
]);

// Task Definition (Fargate)
const task = new aws.ecs.TaskDefinition(`${APP_NAME}-${stack}-taskdef`, {
  family: `${APP_NAME}-${stack}-api`,
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
const sg = new aws.ec2.SecurityGroup(`${APP_NAME}-${stack}-sg`, {
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
const svc = new aws.ecs.Service(`${APP_NAME}-${stack}-svc`, {
  cluster: cluster.arn,
  taskDefinition: task.arn,
  desiredCount: 1,
  launchType: 'FARGATE',
  platformVersion: 'LATEST',
  networkConfiguration: {
    assignPublicIp: true,
    subnets: subnets.ids,
    securityGroups: [sg.id],
  },
});

// Виводи
export const ecsCluster = cluster.name;
export const taskDef = task.arn;
export const serviceName = svc.name;
