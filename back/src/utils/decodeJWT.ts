import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { REFRESH_TOKEN, ACCESS_TOKEN } from './createJWT';

dotenv.config();

const { JWT_TOKEN } = process.env;

const ERROR_BAD_TYPE = 'ERROR_BAD_TYPE' as const;
const ERROR_EXPIRATION = 'ERROR_EXPIRATION' as const;
const ERROR_NO_SECRETKEY = 'ERROR_NO_SECRETKEY' as const;

type TokenType = typeof REFRESH_TOKEN | typeof ACCESS_TOKEN;

type DecodeError = typeof ERROR_BAD_TYPE | typeof ERROR_EXPIRATION | typeof ERROR_NO_SECRETKEY;

interface JWT {
  type: TokenType;
  id: number;
  exp: number;
}

interface decodeJWTResponse {
  id?: number;
  error?: DecodeError;
}

/** decodeJWT
 *  tokenType과 token을 매개변수로 받아
 *  token을 해석한 후 타입과 유효기간을 검사해
 *  옳다면 id, 옳지 않다면 에러코드를 반환
 */
const decodeJWT = (tokenType: TokenType, token: string): decodeJWTResponse => {
  if (JWT_TOKEN) {
    const decode = jwt.verify(token, JWT_TOKEN) as JWT;
    const { type, id, exp } = decode;

    if (type !== tokenType) {
      return { error: ERROR_BAD_TYPE };
    }
    if (exp < new Date().getTime()) {
      return { error: ERROR_EXPIRATION };
    }

    return { id };
  }
  return { error: ERROR_NO_SECRETKEY };
};

export default decodeJWT;
