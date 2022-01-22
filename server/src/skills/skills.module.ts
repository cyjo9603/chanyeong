import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SkillsResolver } from './skills.resolver';
import { SkillsService } from './skills.service';
import { Skill } from './skills.model';

@Module({
  imports: [SequelizeModule.forFeature([Skill])],
  providers: [SkillsResolver, SkillsService],
})
export class SkillsModule {}
