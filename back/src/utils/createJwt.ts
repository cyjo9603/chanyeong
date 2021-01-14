import jwt from 'jsonwebtoken';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const createJWT = (id: number) => {
  const SECRET = process.env.JWT_SECRET_KEY!;
  const refreshToken = jwt.sign({ type: REFRESH_TOKEN, id }, SECRET, { expiresIn: '7d' });
  const accessToken = jwt.sign({ type: ACCESS_TOKEN, id }, SECRET, { expiresIn: '15m' });

  return { refreshToken, accessToken };
};
