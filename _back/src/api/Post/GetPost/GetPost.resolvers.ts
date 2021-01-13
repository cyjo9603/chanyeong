import { Resolvers } from '@gql-types';

import Post from '@models/Post';
import Tag from '@models/Tag';

/** GetPost
 *  단일 포스트 정보 조회,
 */
const resolvers: Resolvers = {
  Query: {
    GetPost: async (_, args) => {
      try {
        const { id } = args;

        const post = await Post.findOne({
          where: { id },
          include: [{ model: Tag }],
        });

        return {
          ok: true,
          post,
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
