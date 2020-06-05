import { Op } from 'sequelize';
import { GetTagPostsQueryArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import Tag from '../../../models/Tag';

const LIMIT_POST = 10 as const;

/** GetTagPosts
 *  태그에 따라 포스트 조회,
 *  id값으로 인피니티 스크롤링
 */
const resolvers: Resolvers = {
  Query: {
    GetTagPosts: async (_, args: GetTagPostsQueryArgs) => {
      try {
        const { lastId, tagId } = args;
        const lastIdWhere = lastId ? { id: { [Op.lt]: lastId } } : undefined;
        const where = tagId ? { id: tagId } : undefined;

        const tag = await Tag.findOne({ where });
        const posts = await tag.getPosts({
          where: lastIdWhere,
          limit: LIMIT_POST,
          include: [{ model: Tag }],
          order: [['id', 'DESC']],
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
