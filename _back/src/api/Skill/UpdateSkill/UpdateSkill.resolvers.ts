import { Resolvers } from '@gql-types';

import Skill from '@models/Skill';

interface UpdateValue {
  [key: string]: string | number;
}

/** UpdateSkill
 *  받은 id값의 skill을 받은 항목들로 업데이트
 */
const resolvers: Resolvers = {
  Mutation: {
    UpdateSkill: async (_, args) => {
      try {
        const updateSkills = args as UpdateValue;
        const updateValue = Object.keys(updateSkills).reduce(
          (value: UpdateValue, key) => {
            if (updateSkills[key] && key !== 'id') {
              // eslint-disable-next-line no-param-reassign
              value[key] = updateSkills[key];
            }
            return value;
          },
          {},
        );

        await Skill.update(updateValue, {
          where: { id: updateSkills.id as number },
        });

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
