import { Resolvers } from '../../../types/resolvers';

import User from '../../../entities/User';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    LogOut: privateResolver(async (_, __, context) => {
      try {
        const { id } = context.req.user;
        await User.update({ id }, { refreshToken: undefined });

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
