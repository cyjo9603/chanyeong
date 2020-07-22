import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Banner from './Banner';
import AboutSummary from './AboutSummary';
import ProjectSummary from './ProjectSummary';
import PostSummary from './PostSummary';
import { GET_PICKED } from '../../queries/picked.queries';
import { getPicked } from '../../types/api';

const HomeContainer = () => {
  const { data } = useQuery<getPicked>(GET_PICKED);

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Banner />
      <AboutSummary />
      <ProjectSummary data={data?.GetPickedProjects.project || []} />
      <PostSummary data={data?.GetPickedPosts.posts || []} />
    </>
  );
};

export default HomeContainer;
