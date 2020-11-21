import React from 'react';

import styled from '@theme/styled';
import RowFrame from '@frames/RowFrame';
import AboutValueList from '@organisms/AboutValueList';
import DetailButton from '@molecules/DetailButton';
import Title, { SMALL_SIZE } from '@atoms/Title';
import SubTitle from '@atoms/SubTitle';

const StyledAboutSmmary = styled.article`
  padding: 40px 0;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.BORDER_LINE_GREY};
`;

const AboutSmmary = () => (
  <RowFrame>
    <StyledAboutSmmary>
      <Title size={SMALL_SIZE} text="About Me" align="center" />
      <SubTitle text="개발자 조찬영에 대해 소개합니다!" align="center" />
      <AboutValueList />
      <DetailButton title="소개" link="/about" />
    </StyledAboutSmmary>
  </RowFrame>
);

export default AboutSmmary;
