import { Resolvers } from '../../../types/api';

import Project from '../../../models/Project';
import privateResolver from '../../../utils/privateResolver';

/** FixProject
 *  프로젝트 메인 페이지에 고정
 */
const resolvers: Resolvers = {
  Mutation: {
    FixProject: privateResolver(async (_, args) => {
      try {
        const { id, fix } = args;
        const picked = fix ? new Date() : null;

        await Project.update({ picked }, { where: { id } });

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
