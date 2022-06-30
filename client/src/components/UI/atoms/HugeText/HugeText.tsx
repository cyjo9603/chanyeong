import React, { FC } from 'react';

import styled from 'styled-components';

interface Props {
  text: string;
}

const StyledHugeText = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: ${({ theme }) => theme.PRIMARY_FONT};
  margin-bottom: 10px;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    font-size: 34px;
  }
  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 28px;
  }
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    font-size: 20px;
  }
`;

const HugeText: FC<Props> = ({ text }) => <StyledHugeText>{text}</StyledHugeText>;

export default HugeText;
