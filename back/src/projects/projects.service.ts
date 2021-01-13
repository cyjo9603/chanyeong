import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Skill } from '@skills/skills.model';
import { Project } from './projects.model';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project) private projectModel: typeof Project) {}

  async getPickeds() {
    try {
      const projects = await this.projectModel.findAll({
        where: { [Op.not]: { picked: null } },
        include: [{ model: Skill }],
        order: [['picked', 'DESC']],
      });

      return { projects };
    } catch (error) {
      return { error };
    }
  }
}
