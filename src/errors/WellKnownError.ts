import {
  WellKnownErrorTypes,
  WellKnownErrorsConfig
} from '../configs/error.config';
import APIError from './APIError';

class WellKnownError extends APIError {
  constructor(errorType: WellKnownErrorTypes) {
    const { message, code, subCode } = WellKnownErrorsConfig[errorType];

    super(message, code, subCode);
  }
}

export default WellKnownError;
