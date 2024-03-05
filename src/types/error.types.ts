import { WellKnownErrorTypes } from '../configs/error.config';
import { responseStatus } from '../configs/resStatus.config';

interface IAPIError {
  message: string;
  code: responseStatus;
  subCode?: number;
}

type IWellKnownError = {
  [key in WellKnownErrorTypes]: IAPIError;
};

export { IAPIError, IWellKnownError };
