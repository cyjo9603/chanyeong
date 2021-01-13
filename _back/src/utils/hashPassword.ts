import bcrypt from 'bcrypt';

const BCRYPT_SALT = 10 as const;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, BCRYPT_SALT);
};

export const comparePassword = (originPassword: string, inputPassword: string) => {
  return bcrypt.compare(inputPassword, originPassword);
};
