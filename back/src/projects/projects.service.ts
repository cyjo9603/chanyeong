import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Skill } from '@skills/skills.model';
import { Project, ProjectType, ProjectWithMethod } from './projects.model';
import { AddProjectRequest } from './dto/addProject.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project) private projectModel: typeof Project) {}

  async add({ skillIds, ...addInfo }: AddProjectRequest) {
    try {
      const project = ((await this.projectModel.create(addInfo)) as unknown) as ProjectWithMethod;
      if (skillIds) {
        await project.addSkills(skillIds);
      }
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getById(id: number) {
    try {
      const project = await this.projectModel.findOne({ where: { id } });
      return { project };
    } catch (error) {
      return { error };
    }
  }

  async getAllByType(type: ProjectType) {
    try {
      const projects = await this.projectModel.findAll({
        where: { type },
        include: [{ model: Skill }],
        order: [['id', 'DESC']],
      });

      return { projects };
    } catch (error) {
      return { error };
    }
  }

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
