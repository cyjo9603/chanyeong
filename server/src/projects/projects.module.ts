import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { Project } from './projects.model';

@Module({
  imports: [SequelizeModule.forFeature([Project])],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
