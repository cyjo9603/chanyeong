import { EditExperienceMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Experience from '../../../models/Experience';
import privateResolver from '../../../utils/privateResolver';

/** EditExperience
 *  경험 수정
 */
const resolvers: Resolvers = {
  Mutation: {
    EditExperience: privateResolver(async (_, args: EditExperienceMutationArgs) => {
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
    }),
  },
};

export default resolvers;
