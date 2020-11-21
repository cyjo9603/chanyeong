import React, { useMemo, memo } from 'react';

import { getSkills_GetSkills_skill } from '@gql-types/api';
import ProgressBar from '@molecules/ProgressBar';
import styled from '@theme/styled';

interface Props {
  data: getSkills_GetSkills_skill;
  onClick?: (data: getSkills_GetSkills_skill) => void;
}

const AboutSkillWrapper = styled.div<{ isAdmin: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 74px;
    height: 74px;
    cursor: ${({ isAdmin }) => (isAdmin ? 'pointer' : 'default')};
  }

  & > h1 {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    font-size: 18px;
    font-weight: 700;
    margin: 6px 0;
    text-align: center;
  }

  & > span {
    width: 170px;
    text-align: center;
    font-size: 14px;
    margin-top: 8px;
    word-break: keep-all;
  }
`;

const AboutSkill = ({ data, onClick }: Props) => {
  const isAdmin = useMemo(() => Boolean(onClick), [onClick]);
  return (
    <AboutSkillWrapper isAdmin={isAdmin}>
      <img
        src={data.icon}
        alt={data.name}
        onClick={isAdmin && (() => onClick(data))}
      />
      <h1>{data.name}</h1>
      <ProgressBar ratio={data.level} />
      <span>{data.description}</span>
    </AboutSkillWrapper>
  );
};

export default memo(AboutSkill);
