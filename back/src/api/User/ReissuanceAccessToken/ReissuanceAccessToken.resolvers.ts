import { ReissuanceAccessTokenMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import User from '../../../models/User';
import { createAccessToken, REFRESH_TOKEN } from '../../../utils/createJWT';
import decodeJWT from '../../../utils/decodeJWT';
import { encryptValue, decryptValue } from '../../../utils/crypto';

/** ReissuanceAccessToken
 *  refreshToken을 받아 유효한 토큰일 경우
 *  DB에 등록된 토큰인지 검사 후
 *  accessToken 재발급
 */
const resolvers: Resolvers = {
  Mutation: {
    ReissuanceAccessToken: async (_, args: ReissuanceAccessTokenMutationArgs) => {
      try {
        const { refreshToken } = args;
        const token = decryptValue(refreshToken);
        const decode = decodeJWT(REFRESH_TOKEN, token);

        if (decode.error) {
          return {
            ok: false,
            error: decode.error,
          };
        }

        const user = await User.findOne({ where: { id: decode.id! } });

        if (user?.refreshToken === token) {
          const newAccessToken = encryptValue(createAccessToken(user.id)!);
          return {
            ok: true,
            token: newAccessToken,
          };
        }

        return {
          ok: false,
          error: 'Bad token',
        };
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
