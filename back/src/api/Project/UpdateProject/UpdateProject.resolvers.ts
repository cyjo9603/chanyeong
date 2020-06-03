import { Resolvers } from '../../../types/resolvers';

import Project from '../../../entities/Project';
import privateResolver from '../../../utils/privateResolver';

interface UpdateValue {
  [key: string]: string | number;
}

/** UpdateProject
 *  프로젝트 데이터 업데이트,
 *  프로젝트 추가와 유사하게 동작
 */
const resolvers: Resolvers = {
  Mutation: {
    UpdateProject: privateResolver(async (_, args) => {
      try {
        const { id, skillIds } = args;
        const skills = skillIds?.map((v: number) => ({ id: v }));

        const updateValue = Object.keys(args).reduce((value: UpdateValue, key) => {
          if (args[key] && key !== 'id' && key !== 'skillIds') {
            // eslint-disable-next-line no-param-reassign
            value[key] = args[key];
          }
          return value;
        }, {});

        const project = await Project.findOne({ id }, { relations: ['skills'] });

        if (project) {
          const updateProject = Object.assign(project, { ...updateValue, skills });
          updateProject.save();
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
