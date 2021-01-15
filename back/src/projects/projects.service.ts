import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Skill } from '@skills/skills.model';
import { Project, ProjectType, ProjectWithMethod } from './projects.model';
import { AddProjectRequest } from './dto/addProject.dto';
import { UpdateProjectRequest } from './dto/updateProject.dto';
import { FixRequest } from '../common/dto/inputFix.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project) private projectModel: typeof Project) {}

  async add({ skillIds, ...addInfo }: AddProjectRequest) {
    try {
      const project = (await this.projectModel.create(addInfo)) as ProjectWithMethod;
      if (skillIds) {
        await project.addSkills(skillIds);
      }
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async update({ id, deleteSkills, addSkills, ...updateInfo }: UpdateProjectRequest) {
    try {
      const project = (await this.projectModel.findOne({ where: { id } })) as ProjectWithMethod;
      if (!project) throw new Error('no project');

      await project.update(updateInfo);
      if (deleteSkills) await project.removeSkill(deleteSkills);
      if (addSkills) await project.addSkill(addSkills);

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async delete(id: number) {
    try {
      const project = (await this.projectModel.findOne({
        where: { id },
        include: [{ model: Skill }],
      })) as ProjectWithMethod;
      await project?.removeSkill(project.skills?.map(({ id: skillId }) => skillId) || []);
      await project?.destroy();
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async fix({ id, fix }: FixRequest) {
    try {
      await this.projectModel.update({ picked: fix ? Date.now() : null }, { where: { id } });
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
