import { GetSkillsQueryArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Skill from '../../../entities/Skill';

/** GetSkills
 *  FRONT_END, BACK_END, DEV_OPS 3가지 타입으로
 *  skill 조회, type이 없다면 모든 skill 조회
 */
const resolvers: Resolvers = {
  Query: {
    GetSkills: async (_, args: GetSkillsQueryArgs) => {
      try {
        const { type } = args;
        const skill = await Skill.find(type ? { type } : undefined);

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
