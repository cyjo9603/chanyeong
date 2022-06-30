import React, { FC, useMemo } from 'react';
import Image from 'next/image';

import { GetSkills_getSkills_skills as Skill } from '@gql-types/api';
import ProgressBar from '@molecules/ProgressBar';
import styled from 'styled-components';

interface Props {
  data: Skill;
  onClick?: (data: Skill) => void;
}

const AboutSkillWrapper = styled.div<{ isAdmin: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
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

const AboutSkill: FC<Props> = ({ data, onClick }) => {
  const isAdmin = useMemo(() => Boolean(onClick), [onClick]);
  return (
    <AboutSkillWrapper isAdmin={isAdmin}>
      <Image
        src={data.icon}
        alt={data.name}
        onClick={isAdmin ? () => onClick(data) : () => undefined}
        width={74}
        height={74}
      />
      <h1>{data.name}</h1>
      <ProgressBar ratio={data.level} />
      <span>{data.description}</span>
    </AboutSkillWrapper>
  );
};

export default AboutSkill;
