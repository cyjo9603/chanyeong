import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import AboutPresenter from './AboutPresenter';
import { GET_SKILLS } from '../../queries/skill.queries';
import { getSkills, getSkills_GetSkills_skill } from '../../types/api';
import { GET_LOCAL_USER } from '../../queries/client';

const AboutContainer = () => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const [openAddSkill, setOpenAddSkill] = useState(false);
  const [editSkillData, setEditSkillData] = useState<getSkills_GetSkills_skill | null>(null);
  const { data: frontData } = useQuery<getSkills>(GET_SKILLS, { variables: { type: 'FRONT_END' } });
  const { data: backData } = useQuery<getSkills>(GET_SKILLS, { variables: { type: 'BACK_END' } });
  const { data: devopsData } = useQuery<getSkills>(GET_SKILLS, { variables: { type: 'DEV_OPS' } });

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
      frontSkills={frontData?.GetSkills.skill}
      backSkills={backData?.GetSkills.skill}
      devopsSkills={devopsData?.GetSkills.skill}
      editSkillData={editSkillData}
      onClickAddSkill={onClickAddSkill}
      onClickEditSkill={onClickEditSkill}
      closeUpdateSKill={closeUpdateSKill}
    />
  );
};

export default AboutContainer;
