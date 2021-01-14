import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { AddExperienceRequest } from './dto/addExperience.dto';
import { Experience } from './experiences.model';

@Injectable()
export class ExperiencesService {
  constructor(@InjectModel(Experience) private experienceModel: typeof Experience) {}

  async get() {
    try {
      const experiences = await this.experienceModel.findAll({ order: [['startDate', 'ASC']] });
      return { experiences };
    } catch (error) {
      return { error };
    }
  }

  async add(input: AddExperienceRequest) {
    try {
      await this.experienceModel.create(input);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
