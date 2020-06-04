import { WritePostMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Post from '../../../models/Post';
import privateResolver from '../../../utils/privateResolver';

/** WritePost
 *  포스트 작성, tag값은 id 프로퍼티를 가진 객체로 변환
 */
const resolvers: Resolvers = {
  Mutation: {
    WritePost: privateResolver(async (_, args: WritePostMutationArgs) => {
      try {
        const { category, title, content, titleImage, tagIds } = args;

        const post = await Post.create({
          category,
          title,
          content,
          titleImage,
        });

        await post.addTag(tagIds);

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
