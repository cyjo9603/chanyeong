import React, { FC } from 'react';
import { useReactiveVar } from '@apollo/client';

import styled from 'styled-components';
import AboutSkill from '@organisms/AboutSKill';
import { GetSkills_getSkills_skills as Skill } from '@gql-types/api';
import { userInfoVar } from '@store/userInfo';

interface Props {
  skills?: Skill[];
  onClick?: (data: Skill) => void;
}

const StyledAboutSkillList = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 30px;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AboutSkillList: FC<Props> = ({ skills, onClick }) => {
  const userInfo = useReactiveVar(userInfoVar);
  return (
    <StyledAboutSkillList>
      {skills?.map((skill) => (
        <AboutSkill
          key={`about_devops_skill${skill.id}`}
          data={skill}
          onClick={userInfo.userName && onClick}
        />
      ))}
    </StyledAboutSkillList>
  );
};

export default AboutSkillList;
