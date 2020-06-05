import { Op } from 'sequelize';
import { GetPostsQueryArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import Post from '../../../models/Post';
import Tag from '../../../models/Tag';

const LIMIT_POST = 10 as const;

/** GetPosts
 *  카테고리에 따라 포스트 조회,
 *  id값으로 인피니티 스크롤링
 */
const resolvers: Resolvers = {
  Query: {
    GetPosts: async (_, args: GetPostsQueryArgs) => {
      try {
        const { lastId, category } = args;
        const lastIdWhere = lastId && { id: { [Op.lt]: lastId } };
        const categoryWhere = category && { category };

        const posts = await Post.findAll({
          where: {
            ...lastIdWhere,
            ...categoryWhere,
          },
          include: [
            {
              model: Tag,
            },
          ],
          order: [['id', 'DESC']],
          limit: LIMIT_POST,
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
