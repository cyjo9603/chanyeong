import { WritePostMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Post from '../../../models/Post';
import Tag from '../../../models/Tag';
import privateResolver from '../../../utils/privateResolver';

/** WritePost
 *  포스트 작성, tag값을 받아 포스트에 삽입
 */
const resolvers: Resolvers = {
  Mutation: {
    WritePost: privateResolver(async (_, args: WritePostMutationArgs) => {
      try {
        const { category, title, content, titleImage, tags } = args;

        const post = await Post.create({
          category,
          title,
          content,
          titleImage,
        });

        if (tags) {
          const result = await Promise.all(
            tags.map((tag) =>
              Tag.findOrCreate({
                where: {
                  name: tag,
                },
              }),
            ),
          );
          await post.addTag(result.map((r) => r[0]));
        }

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
