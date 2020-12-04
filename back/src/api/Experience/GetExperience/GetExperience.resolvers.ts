import { Resolvers } from '../../../types/api';

import Experience from '../../../models/Experience';

/** GetExperiences
 *  경험 목록 조회
 */
const resolvers: Resolvers = {
  Query: {
    GetExperiences: async () => {
      try {
        const experiences = await Experience.findAll({
          order: [['startDate', 'ASC']],
        });

        return {
          ok: true,
          experiences,
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
