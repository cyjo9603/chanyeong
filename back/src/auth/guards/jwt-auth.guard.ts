import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

import { decryptValue } from '@utils/crypto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();
    const authCookie = ctx.req.cookies[process.env.JWT_HEADER!];

    if (authCookie) {
      ctx.req.headers.authorization = `Bearer ${decryptValue(authCookie)}`;
    }

    return ctx.req;
  }
}
