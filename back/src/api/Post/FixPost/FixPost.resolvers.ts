import { Resolvers } from '@gql-types';

import Post from '@models/Post';
import privateResolver from '@utils/privateResolver';

/** FixPost
 *  포스트 메인 페이지에 고정
 */
const resolvers: Resolvers = {
  Mutation: {
    FixPost: privateResolver(async (_, args) => {
      try {
        const { id, fix } = args;
        const picked = fix ? new Date() : null;

        await Post.update({ picked }, { where: { id } });

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
