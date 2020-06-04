import { AddProjectMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Project from '../../../models/Project';
import privateResolver from '../../../utils/privateResolver';

/** AddProject
 *  프로젝트 등록, skills에서 skillIds가 없으면 undefined,
 *  있다면 해당 아이디값을 객체로 변환 후 등록
 */
const resolvers: Resolvers = {
  Mutation: {
    AddProject: privateResolver(async (_, args: AddProjectMutationArgs) => {
      try {
        const {
          type,
          groupName,
          title,
          content,
          description,
          startDate,
          endDate,
          githubAddr,
          titleImage,
          contribution,
          skillIds,
        } = args;

        const project = await Project.create({
          type,
          groupName,
          title,
          content,
          description,
          startDate,
          endDate,
          githubAddr,
          titleImage,
          contribution,
        });

        if (skillIds) {
          await project.addSkills(skillIds);
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
