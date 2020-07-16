import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getProjects } from '../../types/api';
import { GET_PROJECTS } from '../../queries/project.queries';
import { GET_LOCAL_USER } from '../../queries/client';
import PortfolioPresenter from './PortfolioPresenter';

const PortfolioContainer = () => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const { data: groupData } = useQuery<getProjects>(GET_PROJECTS, { variables: { type: 'GROUP' } });
  const { data: personalData } = useQuery<getProjects>(GET_PROJECTS, { variables: { type: 'PERSONAL' } });

  return (
    <PortfolioPresenter
      userInfo={userInfo}
      groupProjects={groupData?.GetProjects.project || []}
      personalProjects={personalData?.GetProjects.project || []}
    />
  );
};

export default PortfolioContainer;
