import { Op } from 'sequelize';
import { Resolvers } from '../../../types/api';
import Post from '../../../models/Post';
import Tag from '../../../models/Tag';

const LIMIT_POST = 10 as const;

/** SearchPosts
 *  검색 단어에 따라 포스트 조회,
 *  id값으로 인피니티 스크롤링
 */
const resolvers: Resolvers = {
  Query: {
    SearchPosts: async (_, args) => {
      try {
        const { searchWord, lastId } = args;
        const lastIdWhere = lastId && { id: { [Op.lt]: lastId } };

        const posts = Post.findAll({
          where: {
            title: {
              [Op.like]: `%${searchWord}%`,
            },
            ...lastIdWhere,
          },
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
