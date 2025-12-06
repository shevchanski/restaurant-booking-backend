import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config();
const target = config.require('target');

function loadImplementation() {
  switch (target) {
    case 'live':
      return require('./src/setups/live');
    case 'dev':
      return require('./src/setups/dev');
    default:
      throw new Error(
        `No setup is defined for target. Provided target: ${target}`,
      );
  }
}

// Pull in the chosen implementation module.
// Any resources defined at top-level in that module will be registered.
// Any exported values from that module will become this stack's outputs.
Object.assign(exports, loadImplementation());
