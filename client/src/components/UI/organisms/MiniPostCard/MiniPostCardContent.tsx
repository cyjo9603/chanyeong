import React, { FC } from 'react';

import styled from '@theme/styled';

interface Props {
  title: string;
  content: string;
}

export const StyledMiniPostCardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
  padding: 6px 12px;
  overflow: hidden;
  color: ${(props) => props.theme.PRIMARY_FONT};

  & > h1 {
    color: currentColor;
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    width: 200px;
    height: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > h2 {
    color: currentColor;
    font-size: 12px;
    font-weight: 400;
    height: 36px;
    margin: 0;
    overflow: hidden;
  }
`;

const MiniPostCardContent: FC<Props> = ({ title, content }) => (
  <StyledMiniPostCardContent>
    <h1>{title}</h1>
    <h2>{content}</h2>
  </StyledMiniPostCardContent>
);

export default MiniPostCardContent;
