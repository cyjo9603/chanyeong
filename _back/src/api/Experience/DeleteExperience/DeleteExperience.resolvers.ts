import { Resolvers } from '@gql-types';

import Experience from '@models/Experience';

/** DeleteExperience
 *  경험 제거
 */
const resolvers: Resolvers = {
  Mutation: {
    DeleteExperience: async (_, args) => {
      try {
        const { id } = args;

        await Experience.destroy({ where: { id } });

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
