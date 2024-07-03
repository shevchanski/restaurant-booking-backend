import dotenv from 'dotenv';
import path from 'node:path';

export default () =>
  dotenv.config({ path: path.join(process.cwd(), '.env.test') });
