import { Query, Args, Resolver } from '@nestjs/graphql';

import { GetSkillsRequest, GetSkillsResponse } from './dto/getSkills.dto';
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
}
