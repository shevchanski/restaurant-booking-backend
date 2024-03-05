import { responseStatus } from '../configs/resStatus.config';

interface IAPIError {
  message: string;
  code: responseStatus;
  subCode?: number;
}

export { IAPIError };
