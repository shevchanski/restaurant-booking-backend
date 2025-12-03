import morgan from 'morgan';

import { NODE_ENV_NAMES } from '../configs/global.config';
import { NODE_ENV } from '../configs/vars';

const morganFormat = NODE_ENV === NODE_ENV_NAMES.DEV ? 'dev' : 'combined';

const RouteLogger = morgan(morganFormat);

export default RouteLogger;
