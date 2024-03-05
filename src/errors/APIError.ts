import { responseStatus } from '../configs/resStatus.config';
import { IAPIError } from '../types/error.types';

class APIError extends Error implements IAPIError {
  readonly code: number;
  readonly subCode?: number;

  constructor(
    message: string,
    responseStatusCode: responseStatus,
    subCode?: number
  ) {
    super(message);
    this.code = responseStatusCode;
    this.subCode = subCode;
  }
}

export default APIError;
