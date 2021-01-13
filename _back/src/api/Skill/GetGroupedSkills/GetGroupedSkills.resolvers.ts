import { Resolvers, GroupedSkills, SkillType, Skill as TSkill } from '@gql-types';

import Skill from '@models/Skill';

/** GetGroupedSkills
 *  FRONT_END, BACK_END, DEV_OPS 을 그룹별로 반환
 */
const resolvers: Resolvers = {
  Query: {
    GetGroupedSkills: async () => {
      try {
        const totalSkills = await Skill.findAll({ order: [['order', 'ASC']] });
        const skills = totalSkills.reduce(
          (groupedSkill: GroupedSkills, skill: TSkill) => {
            if (skill.type === SkillType.FrontEnd) {
              groupedSkill.front!.push(skill);
              return groupedSkill;
            }

            if (skill.type === SkillType.BackEnd) {
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
