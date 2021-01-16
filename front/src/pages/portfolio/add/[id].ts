import { GetServerSideProps } from 'next';

import { initializeApollo } from '@src/apollo';
import { GET_PROJECT } from '@queries';
import { GetProject } from '@gql-types/api';

export { default } from '@pages/AddProject';

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query<GetProject>({
      query: GET_PROJECT,
      variables: { input: { id: Number(id) } },
    });
    return { props: { project: data?.getProject?.project } };
  }
};
