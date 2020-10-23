import { Resolvers } from '../../../types/resolvers';

import Experience from '../../../models/Experience';

/** GetPickedPosts
 *  picked 포스트 조회
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
