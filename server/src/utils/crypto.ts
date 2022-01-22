import crypto from 'crypto-js';

import { secretConstants } from '@auth/constants';

export const encryptValue = (value: string) =>
  crypto.AES.encrypt(value, secretConstants.login).toString();

export const decryptValue = (value: string) =>
  crypto.AES.decrypt(value, secretConstants.login).toString(crypto.enc.Utf8);
