import { Resolvers } from '@gql-types';

import Post from '@models/Post';
import Tag from '@models/Tag';

interface EditValue {
  [key: string]: string[] | number[];
}

type EditPostArgsKeys = 'id' | 'deleteTags' | 'addTags';

/** EditPost
 *  포스트 데이터 수정
 *  프로젝트 추가와 유사하게 동작
 */
const resolvers: Resolvers = {
  Mutation: {
    EditPost: async (_, args) => {
      try {
        const { id, deleteTags, addTags } = args;
        const editPostArgsKeys = Object.keys(args) as EditPostArgsKeys[];

        const editValue = editPostArgsKeys.reduce((value: EditValue, key) => {
          if (args[key] && key !== 'id' && !key.includes('Tags')) {
            // eslint-disable-next-line no-param-reassign
            value[key] = args[key] as string[] | number[];
          }
          return value;
        }, {});

        const post = await Post.findOne({
          where: { id },
          include: [{ model: Tag }],
        });

        if (post) {
          const editPost = Object.assign(post, editValue);
          if (deleteTags) {
            editPost.removeTag(deleteTags);
          }
          if (addTags) {
            const result = await Promise.all(
              addTags.map((tag) =>
                Tag.findOrCreate({
                  where: {
                    name: tag,
                  },
                }),
              ),
            );
            await editPost.addTag(result.map((r: any) => r[0]));
          }
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
    },
  },
};

export default resolvers;
