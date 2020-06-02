import { ReissuanceAccessTokenMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import User from '../../../entities/User';
import { createAccessToken, REFRESH_TOKEN } from '../../../utils/createJWT';
import decodeJWT from '../../../utils/decodeJWT';

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
        const decode = decodeJWT(REFRESH_TOKEN, refreshToken);

        if (decode.error) {
          return {
            ok: false,
            error: decode.error,
          };
        }

        const user = await User.findOne({ id: decode.id });

        if (user && user.refreshToken === refreshToken) {
          const newAccessToken = createAccessToken(user.id);
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
