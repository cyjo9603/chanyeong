import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_TOKEN } = process.env;
export const REFRESH_TOKEN = 'REFRESH_TOKEN' as const;
export const ACCESS_TOKEN = 'ACCESS_TOKEN' as const;

export const createRefreshToken = (id: number) => {
  if (JWT_TOKEN) {
    const token = jwt.sign({ type: REFRESH_TOKEN, id }, JWT_TOKEN, {
      expiresIn: '7d',
    });
    return token;
  }
};

export const createAccessToken = (id: number) => {
  if (JWT_TOKEN) {
    const token = jwt.sign({ type: ACCESS_TOKEN, id }, JWT_TOKEN, {
      expiresIn: '15m',
    });
    return token;
  }
};
