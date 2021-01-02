import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { initializeApollo } from '@src/apollo';
import {
  getSkills_GetSkills_skill,
  getAbouts_GetExperiences,
  getAbouts_GetGroupedSkills,
} from '@gql-types/api';
import { GET_ABOUTS } from '@queries/about.queries';
import { GET_LOCAL_USER } from '@queries/client';
import AboutPresenter from './AboutPresenter';

interface Props {
  GetExperiences: getAbouts_GetExperiences;
  GetGroupedSkills: getAbouts_GetGroupedSkills;
}

const AboutContainer = ({ GetExperiences, GetGroupedSkills }: Props) => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const [openAddSkill, setOpenAddSkill] = useState(false);
  const [
    editSkillData,
    setEditSkillData,
  ] = useState<getSkills_GetSkills_skill | null>(null);

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const onClickAddSkill = useCallback(() => {
    setEditSkillData(null);
    setOpenAddSkill(true);
  }, []);

  const onClickEditSkill = useCallback((data: getSkills_GetSkills_skill) => {
    setEditSkillData(data);
    setOpenAddSkill(true);
  }, []);

  const closeUpdateSKill = useCallback(() => {
    setOpenAddSkill(false);
  }, []);

  return (
    <AboutPresenter
      openAddSkill={openAddSkill}
      userInfo={userInfo}
      frontSkills={GetGroupedSkills?.skills.front || []}
      backSkills={GetGroupedSkills?.skills.back || []}
      devopsSkills={GetGroupedSkills?.skills.devops || []}
      experiences={GetExperiences?.experiences || []}
      editSkillData={editSkillData}
      onClickAddSkill={onClickAddSkill}
      onClickEditSkill={onClickEditSkill}
      closeUpdateSKill={closeUpdateSKill}
    />
  );
};

AboutContainer.getInitialProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_ABOUTS,
    fetchPolicy: 'no-cache',
  });
  return data;
};

export default AboutContainer;
