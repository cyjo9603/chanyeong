import ApolloClient, { InMemoryCache } from 'apollo-boost';

const prod = process.env.NODE_ENV === 'production';

const apolloClient = (initialState) =>
  new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    uri: prod ? 'http://localhost:4000/graphql' : '',
  });

export default apolloClient;
