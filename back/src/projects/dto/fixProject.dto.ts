import { InputType, Field, PickType } from '@nestjs/graphql';

import { Project } from '../projects.model';

@InputType('InputFixProject')
export class FixProjectRequest extends PickType(Project, ['id']) {
  @Field((type) => Boolean)
  fix!: boolean;
}
