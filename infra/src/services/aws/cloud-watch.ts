import * as aws from '@pulumi/aws';
import { LogGroup } from '@pulumi/aws/cloudwatch';
import { GetPolicyDocumentResult, Role } from '@pulumi/aws/iam';
import * as pulumi from '@pulumi/pulumi';

import { AWS_SERVICES, AwsUtil } from '../../utils/aws';

type CloudWatchAgrs = {
  service: pulumi.Input<string>;
  resourceName: pulumi.Input<string>;
  retentionInDays: pulumi.Input<number>;
  roleToAttachPolicy: pulumi.Output<Role>;
};

export class CloudWatch {
  private args: CloudWatchAgrs;

  public logGroup: pulumi.Output<LogGroup>;
  private awsUtils: AwsUtil;

  constructor(args: CloudWatchAgrs) {
    this.args = args;

    this.awsUtils = new AwsUtil({});

    const { logGroup } = this.setupLogGroup();
    this.logGroup = logGroup;
  }

  setupLogGroup() {
    const logGroup = this.createLogGroup();

    const execLogPolicy = this.createLogPolicy(logGroup);

    this.attachPolicy(execLogPolicy);

    return {
      logGroup,
      execLogPolicy,
    };
  }

  private createLogPolicy(logGroup: pulumi.Output<aws.cloudwatch.LogGroup>) {
    return aws.iam.getPolicyDocumentOutput({
      statements: [
        {
          effect: 'Allow',
          actions: [
            'logs:CreateLogStream',
            'logs:PutLogEvents',
            'logs:DescribeLogStreams',
          ],
          resources: [
            this.awsUtils.createArtForService(
              AWS_SERVICES.LOGS,
              `${logGroup.name}:*`,
            ),
          ],
        },
      ],
    });
  }

  createLogGroup() {
    const { resourceName, retentionInDays, service } = this.args;

    return pulumi.output(
      new aws.cloudwatch.LogGroup(`${resourceName}-lg`, {
        name: `/${service}/${resourceName}`,
        retentionInDays: retentionInDays,
      }),
    );
  }

  attachPolicy(policy: pulumi.Output<GetPolicyDocumentResult>) {
    const { resourceName, roleToAttachPolicy: roleForPolicy } = this.args;

    new aws.iam.RolePolicy(`${resourceName}-exec-logs`, {
      role: roleForPolicy.name,
      policy: policy.json,
    });
  }
}
