import { InputType, PartialType, IntersectionType, PickType } from '@nestjs/graphql';

import { User } from '../users.model';

@InputType('InputEditUserInfo')
export class EditUserInfoRequest extends IntersectionType(
  PickType(PartialType(User), ['level', 'familyName', 'givenName', 'password']),
  PickType(User, ['id']),
) {}
