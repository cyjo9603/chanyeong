import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_PICKED } from '@queries';
import { GetPicked } from '@gql-types/api';
import Banner from './Banner';
import AboutSummary from './AboutSummary';
import ProjectSummary from './ProjectSummary';
import PostSummary from './PostSummary';

const HomeContainer = () => {
  const { data } = useQuery<GetPicked>(GET_PICKED);

  return (
    <>
      <Banner />
      <AboutSummary />
      <ProjectSummary data={data?.getPickedProjects.projects || []} />
      <PostSummary data={data?.getPickedPosts.posts || []} />
    </>
  );
};

export default HomeContainer;
