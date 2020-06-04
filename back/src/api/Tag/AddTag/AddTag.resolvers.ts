import { AddTagMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Tag from '../../../models/Tag';
import privateResolver from '../../../utils/privateResolver';

/** AddTag
 *  태그 네임을 받아 없으면 생성, 있으면 id값을 반환
 */
const resolvers: Resolvers = {
  Mutation: {
    AddTag: privateResolver(async (_, args: AddTagMutationArgs) => {
      try {
        const { name } = args;

        const tag = await Tag.findOrCreate({ where: { name } });

        return {
          ok: true,
          tagId: tag[0].id,
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
