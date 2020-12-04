import { Resolvers } from '@gql-types';

import User from '@models/User';

const JWT_HEADER = process.env.JWT_HEADER as string;

const resolvers: Resolvers = {
  Mutation: {
    LogOut: async (_, __, { req, res }) => {
      try {
        await User.update(
          { refreshToken: null },
          { where: { id: req.user || 0 } },
        );

        res.clearCookie(JWT_HEADER);

        return {
          ok: true,
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
