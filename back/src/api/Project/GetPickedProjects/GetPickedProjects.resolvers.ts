import { Resolvers } from '../../../types/resolvers';

import Project from '../../../models/Project';
import Skill from '../../../models/Skill';

/** GetPickedProjects
 *  picked 프로젝트 조회
 */
const resolvers: Resolvers = {
  Query: {
    GetPickedProjects: async () => {
      try {
        const project = await Project.findAll({
          where: { picked: true },
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
