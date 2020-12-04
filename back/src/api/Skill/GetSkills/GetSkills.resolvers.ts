import { Resolvers } from '../../../types/api';

import Skill from '../../../models/Skill';

/** GetSkills
 *  FRONT_END, BACK_END, DEV_OPS 3가지 타입으로
 *  skill 조회, type이 없다면 모든 skill 조회
 */
const resolvers: Resolvers = {
  Query: {
    GetSkills: async (_, args) => {
      try {
        const { type } = args;
        // type null 체크
        const skill = await Skill.findAll({ where: type ? { type } : undefined, order: [['order', 'ASC']] });

        return {
          ok: true,
          skill,
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
