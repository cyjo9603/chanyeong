import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { IdRequest } from '@common/dto/inputId.dto';
import { CoreResponse } from '@common/dto/coreResponse.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ExperiencesService } from './experiences.service';
import { GetExperiences } from './dto/getExperiences.dto';
import { AddExperienceRequest } from './dto/addExperience.dto';
import { EditExperienceRequest } from './dto/editExperience.dto';

@Resolver()
export class ExperiencesResolver {
  constructor(private experiencesService: ExperiencesService) {}

  @Query((returns) => GetExperiences)
  async getExperiences(): Promise<GetExperiences> {
    const { experiences, error } = await this.experiencesService.get();

    if (!experiences || error) return { ok: false, error };

    return { ok: true, experiences };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async addExperience(@Args('input') input: AddExperienceRequest): Promise<CoreResponse> {
    const { ok, error } = await this.experiencesService.add(input);
    return { ok, error };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async editExperience(@Args('input') input: EditExperienceRequest): Promise<CoreResponse> {
    const { ok, error } = await this.experiencesService.update(input);
    return { ok, error };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async deleteExperience(@Args('input') input: IdRequest): Promise<CoreResponse> {
    const { ok, error } = await this.experiencesService.delete(input.id);
    return { ok, error };
  }
}
