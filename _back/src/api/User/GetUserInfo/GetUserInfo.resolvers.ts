import { Resolvers } from '@gql-types';

import User from '@models/User';

/** SignIn
 *  비밀번호 비교 후 맞을경우
 *  id값을 사용해 refresh, access token 생성,
 *  아닐경우 에러코드 응답
 */
const resolvers: Resolvers = {
  Query: {
    GetUserInfo: async (_, __, { req }) => {
      try {
        const user = User.findOne({ where: { id: req.user || 0 } });

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
    },
  },
};

export default resolvers;
