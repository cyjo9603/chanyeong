import { Resolvers } from '../../../types/api';

import Experience from '../../../models/Experience';
import privateResolver from '../../../utils/privateResolver';

/** DeleteExperience
 *  경험 제거
 */
const resolvers: Resolvers = {
  Mutation: {
    DeleteExperience: privateResolver(async (_, args) => {
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
    }),
  },
};

export default resolvers;
