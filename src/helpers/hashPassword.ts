import bcrypt from 'bcryptjs';

export default async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 8);
};