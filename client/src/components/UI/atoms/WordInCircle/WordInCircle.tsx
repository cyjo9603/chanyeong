import React, { FC } from 'react';

import styled from 'styled-components';

interface Props {
  word: string;
}

const StyledWordInCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  line-height: 200px;
  font-size: 40px;
  font-weight: 800;
  text-align: center;
  color: ${({ theme }) => theme.DARK_BACKGROUND_GREY};
  background-color: ${({ theme }) => theme.PRIMARY_COLOR};

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    width: 160px;
    height: 160px;
    line-height: 160px;
  }
`;

const WordInCircle: FC<Props> = ({ word }) => <StyledWordInCircle>{word}</StyledWordInCircle>;

export default WordInCircle;
