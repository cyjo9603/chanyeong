import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink, concat, fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { REFRESH } from '@queries';
import { Refresh } from '@gql-types/api';

export const prod = process.env.NODE_ENV === 'production';

const TOKEN_EXPIRED = 'jwt expired';
const NO_AUTH_TOKEN = 'No auth token';

let apolloClient: ApolloClient<object>;

const link = new HttpLink({
  uri: prod ? process.env.API_URL : 'http://localhost:4000/graphql',
  credentials: 'include',
});

const linkOnError = onError(({ graphQLErrors, operation, forward, response }) => {
  if (!apolloClient) return;
  if (graphQLErrors?.[0].message === TOKEN_EXPIRED) {
    const refresh = fromPromise(
      apolloClient
        .mutate<Refresh>({ mutation: REFRESH })
        .then(({ data }) => {
          return data.refresh.ok;
        }),
    );

    return refresh.filter((result) => result).flatMap(() => forward(operation));
  }
  if (graphQLErrors?.[0].message === NO_AUTH_TOKEN) {
    response.errors = null;
  }
});

const cache = new InMemoryCache();

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    connectToDevTools: !prod,
    link: concat(linkOnError, link),
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
