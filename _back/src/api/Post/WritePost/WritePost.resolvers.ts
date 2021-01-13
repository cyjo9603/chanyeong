import { Resolvers } from '@gql-types';

import Post from '@models/Post';
import Tag from '@models/Tag';

/** WritePost
 *  포스트 작성, tag값을 받아 포스트에 삽입
 */
const resolvers: Resolvers = {
  Mutation: {
    WritePost: async (_, args) => {
      try {
        const { category, title, content, titleImage, tags } = args;

        const post = await Post.create({
          category,
          title,
          content,
          titleImage,
          picked: null,
        });

        if (tags) {
          const result = (await Promise.all(
            tags.map((tag) =>
              Tag.findOrCreate({
                where: {
                  name: tag,
                },
              }),
            ),
          )) as Tag[][];
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
    },
  },
};

export default resolvers;
