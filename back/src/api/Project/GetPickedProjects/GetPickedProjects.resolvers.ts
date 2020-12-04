import { Op } from 'sequelize';

import { Resolvers } from '@gql-types';

import Project from '@models/Project';
import Skill from '@models/Skill';

/** GetPickedProjects
 *  picked 프로젝트 조회
 */
const resolvers: Resolvers = {
  Query: {
    GetPickedProjects: async () => {
      try {
        const project = await Project.findAll({
          where: {
            [Op.not]: {
              picked: null,
            },
          },
          include: [
            {
              model: Skill,
            },
          ],
          order: [['picked', 'DESC']],
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
