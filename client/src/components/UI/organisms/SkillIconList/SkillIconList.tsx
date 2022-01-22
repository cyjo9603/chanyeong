import React, { FC } from 'react';

import styled from '@theme/styled';
import SkillIcon from '@atoms/SkillIcon';
import { GetProject_getProject_project_skills as Skill } from '@gql-types/api';

interface Props {
  title: string;
  skills: Skill[];
}

const StyledSkillIconList = styled.div`
  & > h3 {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    font-size: 20px;
  }

  & img {
    margin-right: 20px;
    margin-bottom: 8px;
  }
`;

const SkillIconList: FC<Props> = ({ title, skills }) => (
  <StyledSkillIconList>
    <h3>{title}</h3>
    {skills.map((v) => (
      <SkillIcon key={`view_project_skill_icon_${v.id}`} icon={v.icon} name={v.name} />
    ))}
  </StyledSkillIconList>
);

export default SkillIconList;
