import { Resolver, Query } from '@nestjs/graphql';
import { ProjectsResponse } from './dto/projectResponse.dto';

import { ProjectsService } from './projects.service';

@Resolver()
export class ProjectsResolver {
  constructor(private projectsService: ProjectsService) {}

  @Query((returns) => ProjectsResponse)
  async getPickedProjects(): Promise<ProjectsResponse> {
    const { projects, error } = await this.projectsService.getPickeds();

    if (!projects || error) return { ok: false, error };

    return { ok: true, projects };
  }
}
