import { Resolver } from '../types/resolvers';
import { decodeJWTResponse } from '../utils/decodeJWT';

const privateResolver = (resolverFunction: Resolver) => async (parent: any, args: any, context: any, info: any) => {
  const user = context.req.user as decodeJWTResponse;
  if (user.error) {
    return { ok: false, error: user.error };
  }

  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
};

export default privateResolver;
