import { GroupedSkills, Skill as SkillType } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

import Skill, { SKILL_TYPE } from '../../../models/Skill';

/** GetGroupedSkills
 *  FRONT_END, BACK_END, DEV_OPS 을 그룹별로 반환
 */
const resolvers: Resolvers = {
  Query: {
    GetGroupedSkills: async () => {
      try {
        const totalSkills = await Skill.findAll({ order: [['order', 'ASC']] });
        const skills = totalSkills.reduce(
          (groupedSkill: GroupedSkills, skill: SkillType) => {
            if (skill.type === SKILL_TYPE.FRONT_END) {
              groupedSkill.front!.push(skill);
              return groupedSkill;
            }

            if (skill.type === SKILL_TYPE.BACK_END) {
              groupedSkill.back!.push(skill);
              return groupedSkill;
            }

            groupedSkill.devops!.push(skill);
            return groupedSkill;
          },
          { front: [], back: [], devops: [] },
        );

        return {
          ok: true,
          skills,
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
