import { Resolver, Query, Args } from '@nestjs/graphql';

import { ProjectsService } from './projects.service';
import { GetProjectRequest } from './dto/getProjects.dto';
import { ProjectsResponse } from './dto/projectResponse.dto';

@Resolver()
export class ProjectsResolver {
  constructor(private projectsService: ProjectsService) {}

  @Query((returns) => ProjectsResponse)
  async getProjects(@Args('input') input: GetProjectRequest) {
    const { projects, error } = await this.projectsService.getAllByType(input.type);

    if (!projects || error) return { ok: false, error };

    return { ok: true, projects };
  }

  @Query((returns) => ProjectsResponse)
  async getPickedProjects(): Promise<ProjectsResponse> {
    const { projects, error } = await this.projectsService.getPickeds();

    if (!projects || error) return { ok: false, error };

    return { ok: true, projects };
  }
}
