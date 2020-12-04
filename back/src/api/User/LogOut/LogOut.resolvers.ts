import { Resolvers } from '@gql-types';

import User from '@models/User';
import privateResolver from '@utils/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    LogOut: privateResolver(async (_, __, context) => {
      try {
        const { id } = context.req.user;
        await User.update({ refreshToken: null }, { where: { id } });

        return {
          ok: true,
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
