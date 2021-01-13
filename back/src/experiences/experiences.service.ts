import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

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
}
