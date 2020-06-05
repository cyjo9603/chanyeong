import { DeleteSkillMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Skill from '../../../models/Skill';
import privateResolver from '../../../utils/privateResolver';

/** DeleteSkill
 *  스킬 id값을 받아 삭제
 */
const resolvers: Resolvers = {
  Mutation: {
    DeleteSkill: privateResolver(async (_, args: DeleteSkillMutationArgs) => {
      try {
        const { id } = args;

        await Skill.destroy({ where: { id } });

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
