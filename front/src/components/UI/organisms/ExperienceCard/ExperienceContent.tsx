import React, { FC } from 'react';

import newLine from '@lib/newLine';
import styled from '@theme/styled';

interface Props {
  title: string;
  content: string;
}

const StyledExperienceContent = styled.div`
  margin-bottom: 16px;
  & > h1 {
    font-size: 22px;
    font-weight: 700;
  }
`;

const ExperienceContent: FC<Props> = ({ title, content }) => (
  <StyledExperienceContent>
    <h1>{title}</h1>
    <div>{newLine(content, title)}</div>
  </StyledExperienceContent>
);

export default ExperienceContent;
