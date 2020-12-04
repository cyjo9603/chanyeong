import { Resolvers } from '@gql-types';

import Project from '@models/Project';
import privateResolver from '@utils/privateResolver';

/** DeleteProject
 *  프로젝트 id값을 받아 삭제
 */
const resolvers: Resolvers = {
  Mutation: {
    DeleteProject: privateResolver(async (_, args) => {
      try {
        const { id } = args;

        await Project.destroy({ where: { id } });

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
