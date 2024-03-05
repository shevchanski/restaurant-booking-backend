import { IWellKnownError } from '../types/error.types';
import { responseStatus } from './resStatus.config';

enum WellKnownErrorTypes {
  NOT_FOUND = 'NOT_FOUND',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  BAD_REQUEST = 'BAD_REQUEST'
}

const WellKnownErrorsConfig: IWellKnownError = {
  [WellKnownErrorTypes.NOT_FOUND]: {
    message: 'Data is not found',
    code: responseStatus.NOT_FOUND
  },
  [WellKnownErrorTypes.NOT_AUTHORIZED]: {
    message: 'Data is not found',
    code: responseStatus.NOT_AUTHORIZED
  },
  [WellKnownErrorTypes.BAD_REQUEST]: {
    message: 'Data is not valid',
    code: responseStatus.BAD_REQUEST
  }
};

export { WellKnownErrorTypes, WellKnownErrorsConfig };
