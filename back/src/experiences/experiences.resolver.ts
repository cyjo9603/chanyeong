import { Resolver, Query } from '@nestjs/graphql';

import { ExperiencesService } from './experiences.service';
import { GetExperiences } from './dto/getExperiences.dto';

@Resolver()
export class ExperiencesResolver {
  constructor(private experiencesService: ExperiencesService) {}

  @Query((returns) => GetExperiences)
  async getExperiences(): Promise<GetExperiences> {
    const { experiences, error } = await this.experiencesService.get();

    if (!experiences || error) return { ok: false, error };

    return { ok: true, experiences };
  }
}
