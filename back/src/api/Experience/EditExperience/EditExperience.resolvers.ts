import { Resolvers } from '@gql-types';

import Experience from '@models/Experience';

/** EditExperience
 *  경험 수정
 */
const resolvers: Resolvers = {
  Mutation: {
    EditExperience: async (_, args) => {
      try {
        const { id, startDate, endDate, title, content } = args;

        await Experience.update(
          {
            startDate,
            endDate,
            title,
            content,
          },
          { where: { id } },
        );

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
