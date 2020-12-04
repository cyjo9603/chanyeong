import { Resolvers } from '@gql-types';
import User from '@models/User';
import { createRefreshToken, createAccessToken } from '@utils/createJWT';
import { comparePassword } from '@utils/hashPassword';
import { encryptValue, decryptValue } from '@utils/crypto';

/** SignIn
 *  비밀번호 비교 후 맞을경우
 *  id값을 사용해 refresh, access token 생성,
 *  아닐경우 에러코드 응답
 */
const resolvers: Resolvers = {
  Mutation: {
    SignIn: async (_, args) => {
      try {
        const { userId, password } = args;

        const decrypedUserId = decryptValue(userId);
        const decrypedPassword = decryptValue(password);

        const user = await User.findOne({ where: { userId: decrypedUserId } });

        if (!user) {
          return {
            ok: false,
            error: 'No User found with that id',
          };
        }

        const checkPassword = await comparePassword(user.password, decrypedPassword);

        if (checkPassword) {
          const refreshToken = createRefreshToken(user.id);
          const accessToken = createAccessToken(user.id);

          user.update({ refreshToken });

          return {
            ok: true,
            token: {
              refreshToken: encryptValue(refreshToken!),
              accessToken: encryptValue(accessToken!),
            },
            userName: `${user.familyName}${user.givenName}`,
          };
        }

        return {
          ok: false,
          error: 'Wrong password',
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
