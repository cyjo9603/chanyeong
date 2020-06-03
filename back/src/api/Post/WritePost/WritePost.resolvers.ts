import { WritePostMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Post from '../../../entities/Post';
import privateResolver from '../../../utils/privateResolver';

/** WritePost
 *  포스트 작성, tag값은 id 프로퍼티를 가진 객체로 변환
 */
const resolvers: Resolvers = {
  Mutation: {
    WritePost: privateResolver(async (_, args: WritePostMutationArgs) => {
      try {
        const { category, title, content, titleImage, tagIds } = args;

        const tags = tagIds?.map((v) => ({ id: v }));

        await Post.create({
          category,
          title,
          content,
          titleImage: titleImage || undefined,
          tags,
        }).save();

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
