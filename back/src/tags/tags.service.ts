import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tags.model';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private tagModel: typeof Tag) {}

  async getById(id: number) {
    try {
      const tag = await this.tagModel.findOne({ where: { id } });
      return { tag };
    } catch (error) {
      return { error };
    }
  }
}
