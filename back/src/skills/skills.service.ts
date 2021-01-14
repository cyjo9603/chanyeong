import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Skill, SkillType } from './skills.model';
import { GroupedSkills } from './dto/getGroupedSkills.dto';
import { AddSkillRequest } from './dto/addSkill.dto';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill) private skillModel: typeof Skill) {}

  async add(input: AddSkillRequest) {
    try {
      await this.skillModel.create(input);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getByType(type?: SkillType) {
    try {
      const skills = await this.skillModel.findAll({
        where: type ? { type } : undefined,
        order: [['order', 'ASC']],
      });
      return { skills };
    } catch (error) {
      return { error };
    }
  }

  async getGroupeds() {
    try {
      const total = await this.skillModel.findAll({ order: [['order', 'ASC']] });
      const skills = (total.reduce(
        (groupedSkill, skill: Skill) => {
          if (skill.type === SkillType.FRONT_END) {
            groupedSkill.front.push(skill);
            return groupedSkill;
          }

          if (skill.type === SkillType.BACK_END) {
            groupedSkill.back.push(skill);
            return groupedSkill;
          }

          groupedSkill.devops.push(skill);
          return groupedSkill;
        },
        { front: [], back: [], devops: [] } as { [key: string]: Skill[] },
      ) as unknown) as GroupedSkills;

      return { skills };
    } catch (error) {
      return { error };
    }
  }
}
