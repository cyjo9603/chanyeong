import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Skill, SkillType } from './skills.model';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill) private skillModel: typeof Skill) {}

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
}
