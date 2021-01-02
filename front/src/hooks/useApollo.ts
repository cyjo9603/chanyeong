import {
  useApolloClient,
  MutationHookOptions,
  ApolloError,
  ServerParseError,
  ApolloClient,
  useMutation,
  MutationTuple,
  OperationVariables,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import { REISSUANCE_ACCESS_TOKEN } from '@queries/user.queries';

import { reissuanceAccessToken } from '@gql-types/api';

const errorHandler = async <TData>(
  error: ApolloError,
  apolloClient: ApolloClient<object>,
  request: (...args: any) => TData,
) => {
  const { statusCode } = (error.networkError as ServerParseError) || {
    statusCode: 0,
  };
  if (statusCode !== 401) {
    throw new ApolloError(error);
  }
  const result = await apolloClient.mutate<reissuanceAccessToken>({
    mutation: REISSUANCE_ACCESS_TOKEN,
  });
  if (result?.data?.ReissuanceAccessToken.ok) {
    const reResponseData = await request();
    return reResponseData;
  }

  throw new ApolloError(error);
};

export const useReissueMutation = <
  TData = any,
  TVariables = OperationVariables
>(
  query: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>,
): MutationTuple<TData, TVariables> => {
  const apolloClient = useApolloClient();
  const mutationTuple = useMutation<TData, TVariables>(query, {
    ...options,
    onError: (error: ApolloError) => {
      errorHandler(error, apolloClient, mutationTuple[0]).catch(
        (apolloError) => {
          if (options?.onError) {
            options.onError(apolloError);
          }
        },
      );
    },
  });
  return mutationTuple;
};
