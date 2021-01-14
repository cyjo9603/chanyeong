import { InputType, PickType } from '@nestjs/graphql';

import { User } from '../users.model';

@InputType('InputSignup')
export class SignupRequest extends PickType(User, [
  'userId',
  'password',
  'familyName',
  'givenName',
]) {}
