import Sequelize from 'sequelize';
import { Resolvers, Tag } from '../../../types/api';

import { sequelize } from '../../../models';
import TagModel from '../../../models/Tag';

const query = `SELECT TagId AS id, COUNT(TagId) AS count FROM PostTag GROUP BY TagId ORDER BY COUNT(PostId) DESC, PostId DESC`;

/** GetTags
 *  사용 빈도가 높은 순으로 태그 반환
 */
const resolvers: Resolvers = {
  Query: {
    GetTags: async () => {
      try {
        const tagOrder = await sequelize.query(query, {
          type: Sequelize.QueryTypes.SELECT,
          raw: true,
        });

        const tagLists = await TagModel.findAll();

        const tags = tagOrder.map((v: { id: number }) => {
          const { name } = tagLists.find((tag: Tag) => v.id === tag.id);
          return { ...v, name };
        });

        return {
          ok: true,
          tags,
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
