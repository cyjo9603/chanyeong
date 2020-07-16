import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_SKILLS } from '../../queries/skill.queries';
import { getSkills } from '../../types/api';
import { GET_LOCAL_USER } from '../../queries/client';
import AboutPresenter from './AboutPresenter';

const AboutContainer = () => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const [openAddSkill, setOpenAddSkill] = useState(false);
  const { data: frontData } = useQuery<getSkills>(GET_SKILLS, { variables: { type: 'FRONT_END' } });
  const { data: backData } = useQuery<getSkills>(GET_SKILLS, { variables: { type: 'BACK_END' } });
  const { data: devopsData } = useQuery<getSkills>(GET_SKILLS, { variables: { type: 'DEV_OPS' } });

  const onClickAddSkill = useCallback(() => {
    setOpenAddSkill(true);
  }, []);

  const closeUpdateSKill = useCallback(() => {
    setOpenAddSkill(false);
  }, []);

  return (
    <AboutPresenter
      openAddSkill={openAddSkill}
      userInfo={userInfo}
      frontSkills={frontData?.GetSkills.skill}
      backSkills={backData?.GetSkills.skill}
      devopsSkills={devopsData?.GetSkills.skill}
      onClickAddSkill={onClickAddSkill}
      closeUpdateSKill={closeUpdateSKill}
    />
  );
};

export default AboutContainer;
