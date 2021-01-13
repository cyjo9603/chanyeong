import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TagsService } from './tags.service';
import { Tag } from './tags.model';

@Module({
  imports: [SequelizeModule.forFeature([Tag])],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
