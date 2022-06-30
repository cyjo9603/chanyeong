import React, { FC } from 'react';
import styled from 'styled-components';

import WordInCircle from '@atoms/WordInCircle';

interface Props {
  engTitle: string;
  korTitle: string;
  content: string;
}

const StyledAboutValue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 310px;

  & > h2 {
    color: ${({ theme }) => theme.LIGHT_BACKGROUND_GREY};
    font-weight: 700;
    font-size: 26px;
    margin: 0;
  }

  & > span {
    margin-top: 20px;
    color: ${({ theme }) => theme.PRIMARY_FONT};
    font-weight: 400;
  }

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    width: 260px;

    & > h2 {
      font-size: 22px;
    }
  }
`;

const AboutValue: FC<Props> = ({ engTitle, korTitle, content }) => (
  <StyledAboutValue>
    <h2>{engTitle}</h2>
    <WordInCircle word={korTitle} />
    <span>{content}</span>
  </StyledAboutValue>
);

export default AboutValue;
