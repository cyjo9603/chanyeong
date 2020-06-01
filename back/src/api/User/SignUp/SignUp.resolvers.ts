import { SignUpMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import User from '../../../entities/User';

/** SignUp
 *  id가 이미 있는지 검사 후
 *  없는 경우 회원가입,
 *  그외 에러코드 응답
 */
const resolvers: Resolvers = {
  Mutation: {
    SignUp: async (_, args: SignUpMutationArgs) => {
      try {
        const { userId, password, familyName, givenName } = args;
        const isUserId = await User.findOne({ userId });
        if (!isUserId) {
          await User.create({
            userId,
            password,
            familyName,
            givenName,
          }).save();

          return {
            ok: true,
            error: null,
          };
        }
        return {
          ok: false,
          error: 'ID already exists',
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
