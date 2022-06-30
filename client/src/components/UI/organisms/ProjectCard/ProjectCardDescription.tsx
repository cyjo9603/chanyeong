import React, { FC } from 'react';

import styled from 'styled-components';

interface Props {
  description: string;
}

export const StyledProjectCardDescription = styled.div`
  width: 190px;
  color: ${({ theme }) => theme.PRIMARY_FONT};
  display: flex;
  align-items: center;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: none;
  }
`;

const ProjectCardDescription: FC<Props> = ({ description }) => (
  <StyledProjectCardDescription>{description}</StyledProjectCardDescription>
);

export default ProjectCardDescription;
