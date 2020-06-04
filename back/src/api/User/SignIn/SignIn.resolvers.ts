import { SignInMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import User from '../../../models/User';
import { createRefreshToken, createAccessToken } from '../../../utils/createJWT';
import { comparePassword } from '../../../utils/hashPassword';

/** SignIn
 *  비밀번호 비교 후 맞을경우
 *  id값을 사용해 refresh, access token 생성,
 *  아닐경우 에러코드 응답
 */
const resolvers: Resolvers = {
  Mutation: {
    SignIn: async (_, args: SignInMutationArgs) => {
      try {
        const { userId, password } = args;
        const user = await User.findOne({ where: { userId } });

        if (!user) {
          return {
            ok: false,
            error: 'No User found with that id',
          };
        }

        const checkPassword = comparePassword(user.password, password);

        if (checkPassword) {
          const refreshToken = createRefreshToken(user.id);
          const accessToken = createAccessToken(user.id);

          user.update({ refreshToken });

          return {
            ok: true,
            token: {
              refreshToken,
              accessToken,
            },
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
