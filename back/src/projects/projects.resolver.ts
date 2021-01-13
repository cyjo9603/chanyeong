import { Resolver, Query, Args } from '@nestjs/graphql';

import { ProjectsService } from './projects.service';
import { GetProjectsRequest } from './dto/getProjects.dto';
import { ProjectsResponse } from './dto/projectResponse.dto';
import { GetProjectRequest, GetProjectResponse } from './dto/getProject.dto';

@Resolver()
export class ProjectsResolver {
  constructor(private projectsService: ProjectsService) {}

  @Query((returns) => GetProjectResponse)
  async getProject(@Args('input') input: GetProjectRequest) {
    const { project, error } = await this.projectsService.getById(input.id);

    if (!project || error) return { ok: false, error };

    return { ok: true, project };
  }

  @Query((returns) => ProjectsResponse)
  async getProjects(@Args('input') input: GetProjectsRequest) {
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
