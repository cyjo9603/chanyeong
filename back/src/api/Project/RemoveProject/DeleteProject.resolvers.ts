import { DeleteProjectMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Project from '../../../entities/Project';
import privateResolver from '../../../utils/privateResolver';

/** DeleteProject
 *  프로젝트 id값을 받아 삭제
 */
const resolvers: Resolvers = {
  Mutation: {
    DeleteProject: privateResolver(async (_, args: DeleteProjectMutationArgs) => {
      try {
        const { id } = args;

        await Project.delete({ id });

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
