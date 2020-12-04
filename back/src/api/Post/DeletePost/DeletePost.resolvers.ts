import { Resolvers } from '@gql-types';

import Post from '@models/Post';

/** DeletePost
 *  포스트 id값을 받아 삭제
 */
const resolvers: Resolvers = {
  Mutation: {
    DeletePost: async (_, args) => {
      try {
        const { id } = args;

        await Post.destroy({ where: { id } });

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
