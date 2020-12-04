import {
  makeExecutableSchema,
  mergeTypeDefs,
  mergeResolvers,
  loadFilesSync,
} from 'graphql-tools';
import path from 'path';

import isAuthDirective from '@auth/isAuthDirective';

const allTypes = loadFilesSync(path.join(__dirname, './api/**/*.graphql'));

const allResolvers = loadFilesSync(
  path.join(__dirname, './api/**/*.resolvers.ts'),
);

const mergedTypeDefs = mergeTypeDefs(allTypes);

const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  schemaDirectives: {
    auth: isAuthDirective as any,
  },
});

export default schema;
