import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CoreResponse } from '@common/dtos/coreResponse.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ExperiencesService } from './experiences.service';
import { GetExperiences } from './dto/getExperiences.dto';
import { AddExperienceRequest } from './dto/addExperience.dto';

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
}
