import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import Banner from './Banner';
import AboutSummary from './AboutSummary';
import ProjectSummary from './ProjectSummary';
import PostSummary from './PostSummary';
import { GET_PICKED } from '../../queries/picked.queries';
import { getPicked } from '../../types/api';

const Index = () => {
  const { data } = useQuery<getPicked>(GET_PICKED);

  return (
    <>
      <Banner />
      <AboutSummary />
      <ProjectSummary data={data?.GetPickedProjects} />
      <PostSummary data={data?.GetPickedPosts} />
    </>
  );
};

export default Index;
