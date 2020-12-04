import { makeExecutableSchema, mergeTypeDefs, mergeResolvers, loadFilesSync } from 'graphql-tools';
import path from 'path';

const allTypes = loadFilesSync(path.join(__dirname, './api/**/*.graphql'));

const allResolvers = loadFilesSync(path.join(__dirname, './api/**/*.resolvers.ts'));

const mergedTypeDefs = mergeTypeDefs(allTypes);

const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
});

export default schema;
