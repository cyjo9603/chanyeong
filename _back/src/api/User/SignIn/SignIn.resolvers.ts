import { Resolvers } from '@gql-types';
import { createRefreshToken, createAccessToken } from '@utils/createJWT';
import { encryptValue } from '@utils/crypto';

const JWT_HEADER = process.env.JWT_HEADER as string;

const EXPIRED = 1000 * 60 * 60 * 24 * 7;

/** SignIn
 *  비밀번호 비교 후 맞을경우
 *  id값을 사용해 refresh, access token 생성,
 *  아닐경우 에러코드 응답
 */
const resolvers: Resolvers = {
  Mutation: {
    SignIn: async (_, { userId, password }, { res, authenticate }) => {
      try {
        const { user, info } = await authenticate('local', {
          email: userId,
          password,
        });

        if (!user) {
          return { ok: false, error: info?.message };
        }

        const refreshToken = createRefreshToken(user.id);
        const accessToken = createAccessToken(user.id);

        await user.update({ refreshToken });

        res.cookie(JWT_HEADER, encryptValue(accessToken!), {
          httpOnly: true,
          maxAge: EXPIRED,
        });

        return {
          ok: true,
          userName: `${user.familyName}${user.givenName}`,
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
