import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';

import styled from '@theme/styled';
import AboutSkill from '@organisms/AboutSKill';
import { getSkills_GetSkills_skill } from '@gql-types/api';
import { GET_LOCAL_USER } from '@queries/client';

interface Props {
  skills?: getSkills_GetSkills_skill[];
  onClick?: (data: getSkills_GetSkills_skill) => void;
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
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  return (
    <StyledAboutSkillList>
      {skills?.map((skill) => (
        <AboutSkill
          key={`about_devops_skill${skill.id}`}
          data={skill}
          onClick={userInfo?.isLoggedIn.userName && onClick}
        />
      ))}
    </StyledAboutSkillList>
  );
};

export default AboutSkillList;
