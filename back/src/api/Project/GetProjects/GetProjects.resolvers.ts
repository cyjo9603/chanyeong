import { GetProjectsQueryArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Project from '../../../models/Project';
import Skill from '../../../models/Skill';

/** GetProjects
 *  타입에 따라 프로젝트 조회
 */
const resolvers: Resolvers = {
  Query: {
    GetProjects: async (_, args: GetProjectsQueryArgs) => {
      try {
        const { type } = args;
        const project = await Project.findAll({
          where: type ? { type } : undefined,
          include: [
            {
              model: Skill,
            },
          ],
          order: [['id', 'DESC']],
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
