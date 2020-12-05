/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  useApolloClient,
  useQuery,
  QueryHookOptions,
  MutationHookOptions,
  ApolloError,
  ServerParseError,
  QueryResult,
  ApolloClient,
  ApolloQueryResult,
  useMutation,
  MutationTuple,
  OperationVariables,
} from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';
import { REISSUANCE_ACCESS_TOKEN } from '@queries/user.queries';

import { reissuanceAccessToken } from '@gql-types/api';

interface UseReissueQueryResponse<TData, TVariables>
  extends QueryResult<TData, TVariables> {
  refetchQuery: (
    variables?: Partial<TVariables>,
  ) => Promise<ApolloQueryResult<TData>>;
}

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

export const useReissueQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
): UseReissueQueryResponse<TData, TVariables> => {
  const apolloClient = useApolloClient();
  const queryResult = useQuery<TData, TVariables>(query, {
    ...options,
    onError: (error: ApolloError) => {
      errorHandler(error, apolloClient, queryResult.refetch)
        .then(async (reQueryResult) => {
          const { data } = await reQueryResult;
          onStartCompleted(data);
        })
        .catch((apolloError) => {
          if (options?.onError) {
            options.onError(apolloError);
          }
        });
    },
  });

  const refetchQuery = async (variables?: Partial<TVariables>) => {
    try {
      const result = await queryResult.refetch(variables);
      onStartCompleted(result.data);
      return result;
    } catch (error) {
      const result = await errorHandler(
        error,
        apolloClient,
        queryResult.refetch,
      ).catch((err) => err);
      onStartCompleted(result.data);

      return result;
    }
  };

  return { ...queryResult, refetchQuery };

  function onStartCompleted(data: TData) {
    if (options?.onCompleted) {
      options.onCompleted(data);
    }
  }
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
