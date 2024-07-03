import { IWellKnownError } from '../types/error.types';
import { responseStatus } from './resStatus.config';

enum WellKnownErrorTypes {
  NOT_FOUND = 'NOT_FOUND',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  BAD_REQUEST = 'BAD_REQUEST',
  RECORD_NOT_FOUND = 'RECORD_NOT_FOUND'
}

const WellKnownErrorsConfig: IWellKnownError = {
  [WellKnownErrorTypes.NOT_FOUND]: {
    message: 'Data is not found',
    code: responseStatus.NOT_FOUND,
    subCode: 404.1
  },
  [WellKnownErrorTypes.NOT_AUTHORIZED]: {
    message: 'Data is not found',
    code: responseStatus.NOT_AUTHORIZED
  },
  [WellKnownErrorTypes.BAD_REQUEST]: {
    message: 'Data is not valid',
    code: responseStatus.BAD_REQUEST
  },
  [WellKnownErrorTypes.RECORD_NOT_FOUND]: {
    message: 'Requested record is not found',
    code: responseStatus.NOT_FOUND,
    subCode: 404.5
  }
};

export { WellKnownErrorTypes, WellKnownErrorsConfig };
