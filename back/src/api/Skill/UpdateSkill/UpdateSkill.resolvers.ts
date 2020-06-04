import { Resolvers } from '../../../types/resolvers';

import Skill from '../../../models/Skill';
import privateResolver from '../../../utils/privateResolver';

interface UpdateValue {
  [key: string]: string | number;
}

/** UpdateSkill
 *  받은 id값의 skill을 받은 항목들로 업데이트
 */
const resolvers: Resolvers = {
  Mutation: {
    UpdateSkill: privateResolver(async (_, args: UpdateValue) => {
      try {
        const updateValue = Object.keys(args).reduce((value: UpdateValue, key) => {
          if (args[key] && key !== 'id') {
            // eslint-disable-next-line no-param-reassign
            value[key] = args[key];
          }
          return value;
        }, {});

        await Skill.update(updateValue, { where: { id: args.id as number } });

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
