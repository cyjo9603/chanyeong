import { GetProjectQueryArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Project from '../../../models/Project';
import Skill from '../../../models/Skill';

/** GetProject
 *  id에 따라 프로젝트 조회
 */
const resolvers: Resolvers = {
  Query: {
    GetProject: async (_, args: GetProjectQueryArgs) => {
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
