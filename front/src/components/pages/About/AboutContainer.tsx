import React, { useState, useCallback } from 'react';
import { useReactiveVar } from '@apollo/client';

import { userInfoVar } from '@store/userInfo';
import {
  GetSkills_getSkills_skills as Skill,
  GetAbouts_getExperiences_experiences as Experiences,
  GetAbouts_getGroupedSkills_skills as Skills,
} from '@gql-types/api';

import UpdateSkillForm from '@modals/UpdateSkillForm';
import AddSkillForm from '@modals/AddSkillForm';
import AboutPresenter from './AboutPresenter';

interface Props {
  experiences: Experiences[];
  skills: Skills;
}

const AboutContainer = ({ experiences, skills }: Props) => {
  const userInfo = useReactiveVar(userInfoVar);
  const [openAddSkill, setOpenAddSkill] = useState(false);
  const [editSkillData, setEditSkillData] = useState<Skill | null>(null);

  const onClickAddSkill = useCallback(() => {
    setEditSkillData(null);
    setOpenAddSkill(true);
  }, []);

  const onClickEditSkill = useCallback((data: Skill) => {
    setEditSkillData(data);
  }, []);

  const closeAddSKill = useCallback(() => {
    setOpenAddSkill(false);
  }, []);

  const closeUpdateSKill = useCallback(() => {
    setEditSkillData(null);
  }, []);

  return (
    <>
      <AboutPresenter
        userName={userInfo.userName}
        frontSkills={skills?.front || []}
        backSkills={skills?.back || []}
        devopsSkills={skills?.devops || []}
        experiences={experiences || []}
        editSkillData={editSkillData}
        onClickAddSkill={onClickAddSkill}
        onClickEditSkill={onClickEditSkill}
      />
      {openAddSkill && <AddSkillForm onClose={closeAddSKill} />}
      {editSkillData && (
        <UpdateSkillForm onClose={closeUpdateSKill} editSkillData={editSkillData} />
      )}
    </>
  );
};

export default AboutContainer;
