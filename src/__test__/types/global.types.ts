import { IUser } from '../../types/user.types';

export type CustomUserCredentials = {
  [key in keyof IUser]?: string;
};

/*eslint-disable @typescript-eslint/no-explicit-any*/
export type ExpectCallbackTest = (
  functionToTest: (...args) => Promise<any> | any,
  input: any
) => void;

export type TestObjectData = { input: any; testOutput: ExpectCallbackTest };
/*eslint-enable @typescript-eslint/no-explicit-any*/
