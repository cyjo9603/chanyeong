import { Resolvers } from '../../../types/resolvers';

import Post from '../../../models/Post';
import Tag from '../../../models/Tag';

/** GetPickedPosts
 *  picked 포스트 조회
 */
const resolvers: Resolvers = {
  Query: {
    GetPickedPosts: async () => {
      try {
        const posts = await Post.findAll({
          where: { picked: true },
          include: [
            {
              model: Tag,
            },
          ],
        });

        return {
          ok: true,
          posts,
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
