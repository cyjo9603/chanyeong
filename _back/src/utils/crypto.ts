import crypto from 'crypto-js';

const { LOGIN_SECRET_KEY } = process.env;

export const encryptValue = (value: string) => crypto.AES.encrypt(value, LOGIN_SECRET_KEY!).toString();

export const decryptValue = (value: string) => crypto.AES.decrypt(value, LOGIN_SECRET_KEY!).toString(crypto.enc.Utf8);
