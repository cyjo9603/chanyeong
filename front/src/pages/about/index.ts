import { GetServerSideProps } from 'next';

import { initializeApollo } from '@src/apollo';
import { GET_ABOUTS } from '@queries';
import { GetAbouts } from '@gql-types/api';

export { default } from '@pages/About';

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetAbouts>({
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
