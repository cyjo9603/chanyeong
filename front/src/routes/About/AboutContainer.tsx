import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getSkills_GetSkills_skill, getAbouts_GetExperiences, getAbouts_GetGroupedSkills } from '@gql-types/api';
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
  const [editSkillData, setEditSkillData] = useState<getSkills_GetSkills_skill | null>(null);

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
      editSkillData={editSkillData}
      onClickAddSkill={onClickAddSkill}
      onClickEditSkill={onClickEditSkill}
      closeUpdateSKill={closeUpdateSKill}
    />
  );
};

AboutContainer.getInitialProps = async (context) => {
  const { apolloClient } = context;
  apolloClient.cache.reset();
  const { data } = await apolloClient.query({
    query: GET_ABOUTS,
  });
  return data;
};

export default AboutContainer;
