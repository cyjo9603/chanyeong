import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Tag } from '@tags/tags.model';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postModel: typeof Post) {}

  async getById(id: number) {
    try {
      const post = await this.postModel.findOne({ where: { id }, include: [{ model: Tag }] });
      return { post };
    } catch (error) {
      return { error };
    }
  }
}
