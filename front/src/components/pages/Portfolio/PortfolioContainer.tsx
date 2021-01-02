import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_LOCAL_USER } from '@queries/client';
import { GET_PROJECTS } from '@queries/project.queries';
import { getProjects } from '@gql-types/api';
import PortfolioPresenter from './PortfolioPresenter';

const PortfolioContainer = () => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const { data: groupData } = useQuery<getProjects>(GET_PROJECTS, {
    variables: { type: 'GROUP' },
  });
  const { data: personalData } = useQuery<getProjects>(GET_PROJECTS, {
    variables: { type: 'PERSONAL' },
  });

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  return (
    <PortfolioPresenter
      userInfo={userInfo}
      groupProjects={groupData?.GetProjects.project || []}
      personalProjects={personalData?.GetProjects.project || []}
    />
  );
};

export default PortfolioContainer;
