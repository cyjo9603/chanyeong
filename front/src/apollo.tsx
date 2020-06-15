import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { withApollo } from 'next-with-apollo';
import { setContext } from 'apollo-link-context';
import { Cookies } from 'react-cookie';

const prod = process.env.NODE_ENV === 'production';

const cookies = new Cookies();

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: prod ? '' : 'http://localhost:4000/graphql',
  credentials: 'same-origin',
});

export default withApollo(({ ctx }) => {
  const accessToken =
    cookies.get('cat') || ctx?.req?.headers.cookie?.replace(/(?:(?:^|.*;\s*)cat\s*\=\s*([^;]*).*$)|^.*$/, '$1') || '';

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'X-JWT': accessToken,
      },
    };
  });

  return new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
    ssrMode: Boolean(ctx),
  });
});
