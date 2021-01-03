import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const prod = process.env.NODE_ENV === 'production';

let apolloClient: ApolloClient<object>;

const link = new HttpLink({
  uri: prod ? process.env.API_URL : 'http://localhost:4000/graphql',
  credentials: 'include',
});

const cache = new InMemoryCache();

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache,
  });

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = Object.assign(initialState, existingCache);

    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export const useApollo = () => {
  const store = useMemo(() => initializeApollo(), []);
  return store;
};
