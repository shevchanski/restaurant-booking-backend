import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config();
const stack = pulumi.getStack();
const grafanaAdminPassword = config.requireSecret('grafanaAdminPassword');
const projectName = stack;

/**
 * VPC
 */
const vpc = new awsx.ec2.Vpc(`${projectName}-vpc`, {
  numberOfAvailabilityZones: 2,
  natGateways: { strategy: 'None' },
});

/**
 * ECS Cluster (чистий aws)
 */
const cluster = new aws.ecs.Cluster(`${projectName}-cluster`, {
  name: `${projectName}-cluster`,
});

/**
 * Security Group для задач (Grafana / Loki / Prometheus)
 * Тут ми не можемо послатись на alb.securityGroups, бо його немає в типі.
 * Робимо SG, який дозволяє HTTP з усього світу (спрощено, тільки для демо).
 */
const tasksSecurityGroup = new aws.ec2.SecurityGroup(
  `${projectName}-tasks-sg`,
  {
    vpcId: vpc.vpcId,
    description: 'Allow HTTP for tasks (demo)',
    ingress: [
      {
        protocol: 'tcp',
        fromPort: 0,
        toPort: 65535,
        cidrBlocks: ['0.0.0.0/0'],
      },
    ],
    egress: [
      {
        protocol: '-1',
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ['0.0.0.0/0'],
      },
    ],
  },
);

/**
 * ALB (awsx v3)
 *
 * У awsx 3.x ApplicationLoadBalancerArgs не містить поля `vpc`.
 * ALB просто створюється в дефолтному VPC/сабнетах акаунта.
 * Для мінімального прикладу цього достатньо.
 */
const alb = new aws.lb.LoadBalancer(`${projectName}-alb`, {
  // без поля vpc
  subnets: vpc.publicSubnetIds,
  securityGroups: [tasksSecurityGroup.id],
});

/**
 * Target group + Listener для Grafana (чистий aws)
 */
const lb = alb;

const grafanaTargetGroup = new aws.lb.TargetGroup(`${projectName}-grafana-tg`, {
  port: 3000,
  protocol: 'HTTP',
  targetType: 'ip',
  vpcId: vpc.vpcId,
  healthCheck: {
    path: '/login',
    port: '3000',
  },
});

const grafanaListener = new aws.lb.Listener(`${projectName}-grafana-listener`, {
  loadBalancerArn: lb.arn,
  port: 80,
  protocol: 'HTTP',
  defaultActions: [
    {
      type: 'forward',
      targetGroupArn: grafanaTargetGroup.arn,
    },
  ],
});

/**
 * IAM Role для ECS задач
 */
const taskExecRole = new aws.iam.Role(`${projectName}-task-exec-role`, {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: 'ecs-tasks.amazonaws.com',
  }),
});

new aws.iam.RolePolicyAttachment(`${projectName}-task-exec-policy-attach`, {
  role: taskExecRole.name,
  policyArn: aws.iam.ManagedPolicy.AmazonECSTaskExecutionRolePolicy,
});

/**
 * Grafana Task Definition
 * ВАЖЛИВО: `containerDefinitions` приймає JSON-строку, тому
 * ми збираємо масив контейнерів і робимо JSON.stringify,
 * а не передаємо Output<string> туди, де потрібен string.
 */
const grafanaTaskDefinition = new aws.ecs.TaskDefinition(
  `${projectName}-grafana-taskdef`,
  {
    family: `${projectName}-grafana`,
    requiresCompatibilities: ['FARGATE'],
    cpu: '256',
    memory: '512',
    networkMode: 'awsvpc',
    executionRoleArn: taskExecRole.arn,
    containerDefinitions: pulumi
      .all([grafanaAdminPassword])
      .apply(([adminPass]) =>
        JSON.stringify([
          {
            name: 'grafana',
            image: 'grafana/grafana:latest',
            essential: true,
            portMappings: [
              {
                containerPort: 3000,
                hostPort: 3000,
                protocol: 'tcp',
              },
            ],
            environment: [
              { name: 'GF_SECURITY_ADMIN_USER', value: 'admin' },
              { name: 'GF_SECURITY_ADMIN_PASSWORD', value: adminPass },
            ],
          },
        ]),
      ),
  },
);

/**
 * Grafana Service
 */
new aws.ecs.Service(
  `${projectName}-grafana-svc`,
  {
    cluster: cluster.arn,
    desiredCount: 1,
    launchType: 'FARGATE',
    taskDefinition: grafanaTaskDefinition.arn,
    networkConfiguration: {
      subnets: vpc.publicSubnetIds,
      assignPublicIp: true,
      securityGroups: [tasksSecurityGroup.id],
    },
    loadBalancers: [
      {
        targetGroupArn: grafanaTargetGroup.arn,
        containerName: 'grafana',
        containerPort: 3000,
      },
    ],
  },
  {
    dependsOn: [grafanaListener],
  },
);

/**
 * (Опційно) Loki + Prometheus робиш аналогічно до Grafana:
 * – окрема TaskDefinition (JSON.stringify([...]))
 * – окремий Service (cluster.arn, taskDefinition.arn, networkConfiguration).
 */

/**
 * URL Grafana
 */
export const grafanaUrl = pulumi.interpolate`http://${lb.dnsName}`;
