import React, { useMemo, memo } from 'react';

import { getSkills_GetSkills_skill } from '@gql-types/api';
import { AboutSkillWrapper, LevelBar } from './styled';

interface Props {
  data: getSkills_GetSkills_skill;
  onClick?: (data: getSkills_GetSkills_skill) => void;
}

const AboutSkill = ({ data, onClick }: Props) => {
  const isAdmin = useMemo(() => Boolean(onClick), [onClick]);
  return (
    <AboutSkillWrapper isAdmin={isAdmin}>
      <img src={data.icon} alt={data.name} onClick={isAdmin && (() => onClick(data))} />
      <h1>{data.name}</h1>
      <LevelBar level={data.level}>
        <div />
      </LevelBar>
      <span>{data.description}</span>
    </AboutSkillWrapper>
  );
};

export default memo(AboutSkill);
