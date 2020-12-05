import jwt from 'jsonwebtoken';

import { Resolvers } from '@gql-types';

import User from '@models/User';
import { createRefreshToken, createAccessToken } from '@utils/createJWT';
import { encryptValue, decryptValue } from '@utils/crypto';

const JWT_HEADER = process.env.JWT_HEADER as string;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const EXPIRED = 1000 * 60 * 60 * 24 * 7;

/** ReissuanceAccessToken
 *  refreshToken을 받아 유효한 토큰일 경우
 *  DB에 등록된 토큰인지 검사 후
 *  accessToken 재발급
 */
const resolvers: Resolvers = {
  Mutation: {
    ReissuanceAccessToken: async (_, __, { req, res }) => {
      try {
        const cookie = req.cookies[JWT_HEADER];

        if (!cookie) {
          return { ok: false, error: 'not a token' };
        }
        const decryptToken = decryptValue(cookie);
        const data = jwt.verify(decryptToken, JWT_SECRET_KEY, {
          ignoreExpiration: true,
        }) as User;

        const user = await User.findOne({ where: { id: data.id } });
        const isRefreshToken = jwt.verify(user.refreshToken, JWT_SECRET_KEY);

        if (!isRefreshToken) {
          return {
            ok: false,
            error: 'Bad token',
          };
        }

        const refreshToken = createRefreshToken(data.id);
        const accessToken = createAccessToken(data.id);

        user.update({ refreshToken });

        res.cookie(JWT_HEADER, encryptValue(accessToken!), {
          httpOnly: true,
          maxAge: EXPIRED,
        });

        return { ok: true };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    },
  },
};

export default resolvers;
