import { GetServerSideProps } from 'next';

import { initializeApollo } from '@src/apollo';
import { GET_POST } from '@queries/post.queries';
import { getPost } from '@gql-types/api';

export { default } from '@pages/WriteBlogPost';

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query<getPost>({
      query: GET_POST,
      variables: { id: parseInt(id, 10) },
    });
    return { props: { post: data?.GetPost.post } };
  }
};
