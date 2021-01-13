import { Resolvers } from '@gql-types';

import Skill from '@models/Skill';

/** DeleteSkill
 *  스킬 id값을 받아 삭제
 */
const resolvers: Resolvers = {
  Mutation: {
    DeleteSkill: async (_, args) => {
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
    },
  },
};

export default resolvers;
