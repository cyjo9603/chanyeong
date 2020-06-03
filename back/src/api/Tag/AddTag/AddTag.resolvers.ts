import { AddTagMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Tag from '../../../entities/Tag';
import privateResolver from '../../../utils/privateResolver';

/** AddTag
 *  태그 네임을 받아 없으면 생성, 있으면 id값을 반환
 */
const resolvers: Resolvers = {
  Mutation: {
    AddTag: privateResolver(async (_, args: AddTagMutationArgs) => {
      try {
        const { name } = args;

        const existingTag = await Tag.findOne({ name });
        if (!existingTag) {
          const newTag = await Tag.create({ name }).save();

          return {
            ok: true,
            tagId: newTag.id,
          };
        }

        return {
          ok: true,
          tagId: existingTag.id,
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
