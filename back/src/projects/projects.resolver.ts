import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { IdRequest } from '@common/dto/inputId.dto';
import { CoreResponse } from '@common/dto/coreResponse.dto';
import { ProjectsService } from './projects.service';
import { GetProjectsRequest } from './dto/getProjects.dto';
import { ProjectsResponse } from './dto/projectResponse.dto';
import { GetProjectResponse } from './dto/getProject.dto';
import { AddProjectRequest } from './dto/addProject.dto';
import { UpdateProjectRequest } from './dto/updateProject.dto';
import { FixRequest } from '../common/dto/inputFix.dto';

@Resolver()
export class ProjectsResolver {
  constructor(private projectsService: ProjectsService) {}

  @Query((returns) => GetProjectResponse)
  async getProject(@Args('input') input: IdRequest): Promise<GetProjectResponse> {
    const { project, error } = await this.projectsService.getById(input.id);

    if (!project || error) return { ok: false, error };

    return { ok: true, project };
  }

  @Query((returns) => ProjectsResponse)
  async getProjects(@Args('input') input: GetProjectsRequest): Promise<ProjectsResponse> {
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

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async addProject(@Args('input') input: AddProjectRequest): Promise<CoreResponse> {
    const { ok, error } = await this.projectsService.add(input);
    return { ok, error };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async updateProject(@Args('input') input: UpdateProjectRequest): Promise<CoreResponse> {
    const { ok, error } = await this.projectsService.update(input);
    return { ok, error };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async deleteProject(@Args('input') input: IdRequest): Promise<CoreResponse> {
    const { ok, error } = await this.projectsService.delete(input.id);
    return { ok, error };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async fixProject(@Args('input') input: FixRequest): Promise<CoreResponse> {
    const { ok, error } = await this.projectsService.fix(input);
    return { ok, error };
  }
}
