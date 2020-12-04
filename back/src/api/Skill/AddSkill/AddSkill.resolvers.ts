import { Resolvers } from '../../../types/api';

import Skill from '../../../models/Skill';
import privateResolver from '../../../utils/privateResolver';

/** AddSkill
 *  FRONT_END, BACK_END, DEV_OPS 3가지 타입으로
 *  skill 추가
 */
const resolvers: Resolvers = {
  Mutation: {
    AddSkill: privateResolver(async (_, args) => {
      try {
        const { name, type, level, description, icon, order } = args;
        await Skill.create({ name, type, level, description, icon, order });

        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    }),
  },
};

export default resolvers;
