import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ExperiencesResolver } from './experiences.resolver';
import { ExperiencesService } from './experiences.service';
import { Experience } from './experiences.model';

@Module({
  imports: [SequelizeModule.forFeature([Experience])],
  providers: [ExperiencesResolver, ExperiencesService],
})
export class ExperiencesModule {}
