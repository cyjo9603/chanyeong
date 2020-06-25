import React, { memo } from 'react';

import { AboutSkillWrapper, LevelBar } from './styled';
import { getSkills_GetSkills_skill } from '../../types/api';

interface Props {
  data: getSkills_GetSkills_skill;
}

const AboutSkill = ({ data: { name, level, description, icon } }: Props) => (
  <AboutSkillWrapper>
    <img src={icon} alt={name} />
    <h1>{name}</h1>
    <LevelBar level={level}>
      <div />
    </LevelBar>
    <span>{description}</span>
  </AboutSkillWrapper>
);

export default memo(AboutSkill);
