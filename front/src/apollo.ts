import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { withApollo } from 'next-with-apollo';

export const prod = process.env.NODE_ENV === 'production';
const link = createHttpLink({
  uri: prod ? process.env.API_URL : 'http://localhost:4000/graphql',
  credentials: 'include',
});

const cache = new InMemoryCache();

export interface LocalSignIn {
  isLoggedIn: {
    __typename: 'IsLoggedIn';
    userName: string | null;
  };
}

cache.writeData({
  data: {
    isLoggedIn: {
      __typename: 'IsLoggedIn',
      userName: null,
    },
  },
});

const globalApolloClient = new ApolloClient({
  cache,
  link,
  resolvers: {
    Mutation: {
      LocalSignIn: (_, { userName }, { cache }) => {
        cache.writeData({
          data: {
            isLoggedIn: {
              __typename: 'IsLoggedIn',
              userName,
            },
          },
        });
      },
      LocalLogOut: (_, __, { cache }) => {
        cache.writeData({
          data: {
            isLoggedIn: {
              __typename: 'IsLoggedIn',
              userName: null,
            },
          },
        });
      },
    },
  },
});

export default withApollo(({ initialState }) => {
  globalApolloClient.restore(initialState);
  return globalApolloClient;
});
