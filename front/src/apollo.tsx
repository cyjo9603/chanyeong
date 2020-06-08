import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const prod = process.env.NODE_ENV === 'production';

const link = createHttpLink({
  uri: prod ? '' : 'http://localhost:4000/graphql',
  fetch,
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default apolloClient;
