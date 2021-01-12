import React, { useEffect } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';

import { userInfoVar } from '@store/userInfo';
import { GET_PROJECTS } from '@queries';
import { GetProjects } from '@gql-types/api';
import PortfolioPresenter from './PortfolioPresenter';

const PortfolioContainer = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const { data: groupData } = useQuery<GetProjects>(GET_PROJECTS, {
    variables: { type: 'GROUP' },
  });
  const { data: personalData } = useQuery<GetProjects>(GET_PROJECTS, {
    variables: { type: 'PERSONAL' },
  });

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  return (
    <PortfolioPresenter
      userName={userInfo.userName}
      groupProjects={groupData?.GetProjects.project || []}
      personalProjects={personalData?.GetProjects.project || []}
    />
  );
};

export default PortfolioContainer;
