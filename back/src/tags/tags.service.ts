import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Sequelize from 'sequelize';
import { Sequelize as TSequelize } from 'sequelize-typescript';

import { Tag } from './tags.model';
import { TagWithCount } from './dto/getTags.dto';

const GET_TAG_COUNTS = `SELECT TagId AS id, COUNT(TagId) AS count FROM postTag GROUP BY TagId ORDER BY COUNT(PostId) DESC, PostId DESC`;

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private tagModel: typeof Tag, private sequelize: TSequelize) {}

  async getById(id: number) {
    try {
      const tag = await this.tagModel.findOne({ where: { id } });
      return { tag };
    } catch (error) {
      return { error };
    }
  }

  async getTagsWithCount() {
    try {
      const { tagCounts, tagLists } = await this.sequelize.transaction(async (transaction) => {
        const counts = (await this.sequelize.query(GET_TAG_COUNTS, {
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        })) as TagWithCount[];

        const lists = await this.tagModel.findAll({ transaction });

        return { tagCounts: counts, tagLists: lists };
      });

      const tags = tagCounts.map((tagCount) => {
        const { name } = tagLists.find((tag) => tagCount.id === tag.id) as Tag;
        return { ...tagCount, name };
      }) as TagWithCount[];

      return { tags };
    } catch (error) {
      return { error };
    }
  }

  async addTags(tags: string[]) {
    try {
      const tagResults = await this.sequelize.transaction(async (transaction) => {
        const _tags = await Promise.all(
          tags.map((tag) => this.tagModel.findOrCreate({ where: { name: tag }, transaction })),
        );
        return _tags;
      });

      const createdTags = tagResults.map((tagResult) => tagResult[0]);
      return { createdTags };
    } catch (error) {
      return { error };
    }
  }
}
