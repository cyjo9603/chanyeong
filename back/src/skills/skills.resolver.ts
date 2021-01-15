import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { CoreResponse } from '@/common/dto/coreResponse.dto';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { GetGroupedSkillsResponse } from './dto/getGroupedSkills.dto';
import { GetSkillsRequest, GetSkillsResponse } from './dto/getSkills.dto';
import { AddSkillRequest } from './dto/addSkill.dto';
import { DeleteSkillRequest } from './dto/deleteSkill.dto';
import { UpdateSkillRequest } from './dto/updateSkill.dto';
import { SkillsService } from './skills.service';

@Resolver()
export class SkillsResolver {
  constructor(private skillsService: SkillsService) {}

  @Query((returns) => GetSkillsResponse)
  async getSkills(
    @Args('input', { nullable: true }) input?: GetSkillsRequest,
  ): Promise<GetSkillsResponse> {
    const { skills, error } = await this.skillsService.getByType(input?.type);

    if (!skills || error) return { ok: false, error };

    return { ok: true, skills };
  }

  @Query((returns) => GetGroupedSkillsResponse)
  async getGroupedSkills(): Promise<GetGroupedSkillsResponse> {
    const { skills, error } = await this.skillsService.getGroupeds();

    if (!skills || error) return { ok: false, error };

    return { ok: true, skills };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async addSkill(@Args('input') input: AddSkillRequest): Promise<CoreResponse> {
    const { ok, error } = await this.skillsService.add(input);

    return { ok, error };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async deleteSkill(@Args('input') input: DeleteSkillRequest): Promise<CoreResponse> {
    const { ok, error } = await this.skillsService.delete(input.id);

    return { ok, error };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async updateSkill(@Args('input') input: UpdateSkillRequest): Promise<CoreResponse> {
    const { ok, error } = await this.skillsService.update(input);

    return { ok, error };
  }
}
