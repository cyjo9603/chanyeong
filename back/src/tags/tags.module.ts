import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TagsService } from './tags.service';
import { Tag } from './tags.model';
import { TagsResolver } from './tags.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Tag])],
  providers: [TagsResolver, TagsService],
  exports: [TagsService],
})
export class TagsModule {}
