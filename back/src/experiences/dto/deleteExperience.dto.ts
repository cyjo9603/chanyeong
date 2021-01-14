import { InputType, PickType } from '@nestjs/graphql';
import { Experience } from '../experiences.model';

@InputType('InputDeleteExperience')
export class DeleteExperienceRequest extends PickType(Experience, ['id']) {}
