import { Resolvers } from '@gql-types';

import Project from '@models/Project';
import Skill from '@models/Skill';

/** GetProject
 *  id에 따라 프로젝트 조회
 */
const resolvers: Resolvers = {
  Query: {
    GetProject: async (_, args) => {
      try {
        const { id } = args;
        const project = await Project.findOne({
          where: { id },
          include: [
            {
              model: Skill,
            },
          ],
        });

        return {
          ok: true,
          project,
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
