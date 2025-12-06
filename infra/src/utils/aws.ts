import { join } from 'node:path';
import { GetCallerIdentityResult } from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

export enum AWS_SERVICES {
  SSM = 'ssm',
}

const RESOURCE_NAME_BY_SERVICE: Record<AWS_SERVICES, string> = {
  [AWS_SERVICES.SSM]: 'parameter',
};

type AwsUtilArgs = {
  region: pulumi.Input<string>;
  awsIdentity: pulumi.Output<GetCallerIdentityResult>;
};

export class AwsUtil {
  private region: pulumi.Input<string>;
  private awsIdentity: pulumi.Output<GetCallerIdentityResult>;

  constructor({ region, awsIdentity }: AwsUtilArgs) {
    if (!region || !awsIdentity) {
      throw new Error('AWS region is not provided');
    }

    this.region = region;
    this.awsIdentity = awsIdentity;
  }

  createArtForService(service: AWS_SERVICES, resourcePath: string) {
    const resourceName = RESOURCE_NAME_BY_SERVICE[service];

    const accountId = this.awsIdentity.accountId;
    const region = this.region;

    return pulumi.interpolate`arn:aws:${service}:${region}:${accountId}:${join(`${resourceName}/`, resourcePath)}`;
  }
}
