import React, { FC } from 'react';

import styled from '@theme/styled';

interface Props {
  ratio: number;
}

const StyledProgressBar = styled.div<Props>`
  position: relative;
  width: 90px;
  height: 8px;
  background-color: ${(props) => props.theme.SKILL_GREY};
  border-radius: 4px;

  & > div {
    position: absolute;
    width: ${({ ratio }) => ratio * 9}px;
    height: 8px;
    border-radius: 4px;
    background-color: ${({ ratio, theme }) => {
      if (ratio < 3) {
        return theme.SKILL_RED;
      }
      if (ratio < 7) {
        return theme.SKILL_YELLOW;
      }
      return theme.SKILL_GREEN;
    }};
  }
`;

const ProgressBar: FC<Props> = ({ ratio }) => {
  return (
    <StyledProgressBar ratio={ratio}>
      <div />
    </StyledProgressBar>
  );
};

export default ProgressBar;
