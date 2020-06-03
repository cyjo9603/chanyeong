import { Resolvers } from '../../../types/resolvers';

import Post from '../../../entities/Post';
import privateResolver from '../../../utils/privateResolver';

interface EditValue {
  [key: string]: string | number;
}

/** EditPost
 *  포스트 데이터 수정
 *  프로젝트 추가와 유사하게 동작
 */
const resolvers: Resolvers = {
  Mutation: {
    EditPost: privateResolver(async (_, args) => {
      try {
        const { id, tagIds } = args;
        const tags = tagIds?.map((v: number) => ({ id: v }));

        const editValue = Object.keys(args).reduce((value: EditValue, key) => {
          if (args[key] && key !== 'id' && key !== 'tagIds') {
            // eslint-disable-next-line no-param-reassign
            value[key] = args[key];
          }
          return value;
        }, {});

        const post = await Post.findOne({ id }, { relations: ['tags'] });

        if (post) {
          const editPost = Object.assign(post, { ...editValue, tags });
          editPost.save();
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
