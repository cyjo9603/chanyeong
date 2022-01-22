import React, { FC } from 'react';

import styled from '@theme/styled';
import WorkProcessItem from '@molecules/WorkProcessItem';

export const StyledWorkProcess = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const WorkProcess: FC = () => (
  <StyledWorkProcess>
    <WorkProcessItem engName="planning" korName="기획" />
    <WorkProcessItem engName="design" korName="디자인" />
    <WorkProcessItem engName="development" korName="개발" />
    <WorkProcessItem engName="debugging" korName="테스팅" />
    <WorkProcessItem engName="deploy" korName="배포" />
  </StyledWorkProcess>
);

export default WorkProcess;
