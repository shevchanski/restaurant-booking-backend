import { WellKnownErrorTypes } from '../configs/error.config';
import { responseStatus } from '../configs/resStatus.config';
import { ControllerCallbeck, MdlwrCallback } from './global.types';

interface IAPIError {
  message: string;
  code: responseStatus;
  subCode?: number;
}

type IWellKnownError = {
  [key in WellKnownErrorTypes]: IAPIError;
};

type ErrorWrapperCallback = ControllerCallbeck | MdlwrCallback;

export { IAPIError, IWellKnownError, ErrorWrapperCallback };
