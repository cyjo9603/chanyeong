import { Resolvers } from '../../../types/resolvers';
import { FixPostMutationArgs } from '../../../types/graph';

import Post from '../../../models/Post';
import privateResolver from '../../../utils/privateResolver';

/** FixPost
 *  포스트 메인 페이지에 고정
 */
const resolvers: Resolvers = {
  Mutation: {
    FixPost: privateResolver(async (_, args: FixPostMutationArgs) => {
      try {
        const { id, fix } = args;

        await Post.update({ picked: fix }, { where: { id } });

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
