import { GetServerSideProps } from 'next';
import { initializeApollo } from '@src/apollo';

import { GET_POST } from '@queries/post.queries';
import { getPost } from '@gql-types/api';

export { default } from '@pages/BlogPost';

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;
    const apolloClient = initializeApollo();
    const postData = await apolloClient.query<getPost>({
      query: GET_POST,
      variables: { id: Number(id) },
      fetchPolicy: 'no-cache',
    });
    return { props: { post: postData.data.GetPost?.post } };
  }
};
