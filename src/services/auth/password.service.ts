import bcrypt from 'bcrypt';
import { responseStatus } from '../../configs/resStatus.config';
import APIError from '../../errors/APIError';

async function hashPassword(plainPassword: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(plainPassword, 5);

  return hashedPassword;
}

async function comparePasswords(plainPassword: string, hashedPassword: string) {
  const isPasswordCorrect = await bcrypt.compare(plainPassword, hashedPassword);

  if (!isPasswordCorrect) {
    throw new APIError('Wrong password or email', responseStatus.BAD_REQUEST);
  }
}

export default { hashPassword, comparePasswords };
