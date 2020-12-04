import { Resolvers } from '@gql-types';

import User from '@models/User';
import privateResolver from '@utils/privateResolver';

/** SignIn
 *  비밀번호 비교 후 맞을경우
 *  id값을 사용해 refresh, access token 생성,
 *  아닐경우 에러코드 응답
 */
const resolvers: Resolvers = {
  Query: {
    GetUserInfo: privateResolver(async (_, __, context) => {
      try {
        const { id } = context.req.user;
        const user = User.findOne({ where: { id } });

        return {
          ok: true,
          user,
        };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    }),
  },
};

export default resolvers;
