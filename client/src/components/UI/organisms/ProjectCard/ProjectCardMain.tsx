import React, { FC } from 'react';

import styled from 'styled-components';
import { ProjectType } from '@gql-types/api';

interface Props {
  title: string;
  type: ProjectType;
  groupName?: string;
  startDate: string;
  endDate: string;
}

const StyledProjectCardMain = styled.div`
  width: 150px;
  margin: 4px 8px;

  & h1 {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    font-size: 20px;
    font-weight: 700;
    margin: 0;
  }

  & h2 {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }

  & span {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    font-size: 10px;
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 200px;
  }
`;

const ProjectCardMain: FC<Props> = ({ title, type, groupName, startDate, endDate }) => (
  <StyledProjectCardMain>
    <div>
      <h1>{title}</h1>
      <h2>{(type === 'GROUP' && groupName) || '개인 프로젝트'}</h2>
      <span>{`${startDate} ~ ${endDate || ''}`}</span>
    </div>
  </StyledProjectCardMain>
);

export default ProjectCardMain;
