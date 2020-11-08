import React, { FC } from 'react';

import styled from '@theme/styled';
import RowFrame from '@frames/RowFrame';
import PageNav from '@organisms/PageNav';
import ScrollLogo from '@molecules/ScrollLogo';

interface Props {
  scrollRatio: number;
  statusHidden: boolean;
}

const StyledHeaderSection = styled.div<Props>`
  position: sticky;
  top: 0;
  ${({ theme, statusHidden }) =>
    statusHidden &&
    `
  background-color: ${theme.BACKGROUND_COLOR_RGBA};
  backdrop-filter: saturate(180%) blur(20px);
  `}
  border-bottom: 1px solid ${({ theme }) => theme.BORDER_LINE_GREY};
  z-index: 100;
  transition: background 0.3s;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${({ scrollRatio }) => 80 - 30 * scrollRatio}px;
  }

  & nav {
    & > svg {
      height: 100%;
    }

    @media (max-width: ${({ theme }) => theme.BP.PC}) {
    position: absolute;
    width: 60px;
    right: 0;
  }
  }
`;

const HeaderSection: FC<Props> = ({ scrollRatio, statusHidden }) => (
  <StyledHeaderSection scrollRatio={scrollRatio} statusHidden={statusHidden}>
    <RowFrame>
      <ScrollLogo scrollRatio={scrollRatio} />
      <PageNav />
    </RowFrame>
  </StyledHeaderSection>
);

export default HeaderSection;
