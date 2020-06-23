import { Resolvers } from '../../../types/resolvers';
import { FixProjectMutationArgs } from '../../../types/graph';

import Project from '../../../models/Project';
import privateResolver from '../../../utils/privateResolver';

/** FixProject
 *  프로젝트 메인 페이지에 고정
 */
const resolvers: Resolvers = {
  Mutation: {
    FixProject: privateResolver(async (_, args: FixProjectMutationArgs) => {
      try {
        const { id, fix } = args;

        await Project.update({ picked: fix }, { where: { id } });

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
