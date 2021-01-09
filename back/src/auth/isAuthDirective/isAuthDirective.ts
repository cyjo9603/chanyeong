import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import passport from 'passport';

import { decryptValue } from '@utils/crypto';

const JWT_HEADER = process.env.JWT_HEADER as string;

const EXPRIED_ERROR = 'jwt expired';

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;

    // eslint-disable-next-line no-param-reassign
    field.resolve = async function (...args) {
      const [, , { req, res }] = args;
      if (!req.headers.authorization) {
        const cookie = req.cookies[JWT_HEADER];
        if (cookie) {
          const decryptToken = decryptValue(cookie);
          req.headers.authorization = cookie && `Bearer ${decryptToken}`;
        }
      }

      await new Promise<void>((resFn) => {
        passport.authenticate('jwt', (error, payload, { message } = {}) => {
          if (message === EXPRIED_ERROR) throw new Error(EXPRIED_ERROR);
          if (error || !payload)
            return res.send({ data: { ok: false, message } });
          req.user = payload;
          resFn();
        })(req, res);
      });

      return resolve.apply(this, args);
    };
  }
}

export default IsAuthenticatedDirective;
