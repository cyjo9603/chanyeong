import { GetServerSideProps } from 'next';

import { initializeApollo } from '@src/apollo';
import { GET_ABOUTS } from '@queries/about.queries';
import { getAbouts } from '@gql-types/api';

export { default } from '@pages/About';

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<getAbouts>({
    query: GET_ABOUTS,
    fetchPolicy: 'no-cache',
  });
  return {
    props: {
      experiences: data.GetExperiences.experiences,
      skills: data.GetGroupedSkills.skills,
    },
  };
};
