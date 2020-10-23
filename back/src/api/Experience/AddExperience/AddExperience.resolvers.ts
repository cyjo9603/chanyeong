import { AddExperienceMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Experience from '../../../models/Experience';
import privateResolver from '../../../utils/privateResolver';

/** AddExperience
 *  경험 등록
 */
const resolvers: Resolvers = {
  Mutation: {
    AddExperience: privateResolver(async (_, args: AddExperienceMutationArgs) => {
      try {
        const { startDate, endDate, title, content } = args;

        await Experience.create({ startDate, endDate, title, content });

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
