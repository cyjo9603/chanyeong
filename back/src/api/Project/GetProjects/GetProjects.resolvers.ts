import { GetProjectsQueryArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Project from '../../../entities/Project';

/** GetProjects
 *  타입에 따라 프로젝트 조회
 */
const resolvers: Resolvers = {
  Query: {
    GetProjects: async (_, args: GetProjectsQueryArgs) => {
      try {
        const { type } = args;
        const project = await Project.find({ where: { type }, relations: ['skills'] });

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
