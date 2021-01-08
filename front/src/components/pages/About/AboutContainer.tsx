import React, { useState, useCallback, useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';

import { userInfoVar } from '@store/userInfo';
import { initializeApollo } from '@src/apollo';
import {
  getSkills_GetSkills_skill,
  getAbouts_GetExperiences,
  getAbouts_GetGroupedSkills,
} from '@gql-types/api';
import { GET_ABOUTS } from '@queries/about.queries';
import AboutPresenter from './AboutPresenter';

interface Props {
  GetExperiences: getAbouts_GetExperiences;
  GetGroupedSkills: getAbouts_GetGroupedSkills;
}

const AboutContainer = ({ GetExperiences, GetGroupedSkills }: Props) => {
  const userInfo = useReactiveVar(userInfoVar);
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
  }, []);

  const closeAddSKill = useCallback(() => {
    setOpenAddSkill(false);
  }, []);

  const closeUpdateSKill = useCallback(() => {
    setEditSkillData(null);
  }, []);

  return (
    <AboutPresenter
      openAddSkill={openAddSkill}
      userName={userInfo.userName}
      frontSkills={GetGroupedSkills?.skills.front || []}
      backSkills={GetGroupedSkills?.skills.back || []}
      devopsSkills={GetGroupedSkills?.skills.devops || []}
      experiences={GetExperiences?.experiences || []}
      editSkillData={editSkillData}
      onClickAddSkill={onClickAddSkill}
      onClickEditSkill={onClickEditSkill}
      closeAddSKill={closeAddSKill}
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
