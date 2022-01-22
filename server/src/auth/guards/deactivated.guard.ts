import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class DeactivateGuard {
  canActivate() {
    throw new HttpException('deactivated graphql request', 401);
  }
}
