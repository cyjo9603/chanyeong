import { Resolvers } from '../../../types/resolvers';

import Project from '../../../models/Project';
import privateResolver from '../../../utils/privateResolver';
import Skill from '../../../models/Skill';

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
        const { id, deleteSkills, addSkills } = args;

        const updateValue = Object.keys(args).reduce((value: UpdateValue, key) => {
          if (key !== 'id' && key !== 'deleteSkills' && key !== 'addSkills') {
            // eslint-disable-next-line no-param-reassign
            value[key] = args[key];
          }
          return value;
        }, {});

        const project = await Project.findOne({ where: { id }, include: [{ model: Skill }] });
        if (project) {
          const updateProject = Object.assign(project, updateValue);
          if (deleteSkills) {
            updateProject.removeSkill(deleteSkills);
          }
          if (addSkills) {
            updateProject.addSkill(addSkills);
          }
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
