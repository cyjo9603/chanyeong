import React, { FC } from 'react';

import RowFrame from '@frames/RowFrame';
import DarkLogoIcon from '@svg-icons/DarkLogoIcon';
import FooterContent from '@molecules/FooterContent';
import styled from '@theme/styled';

const FooterWrapper = styled.footer`
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.FOOTER_BACKGROUND};
  width: 100%;
  height: 140px;

  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & svg {
    margin-top: 20px;
    width: 140px;
  }
`;

const Footer: FC = () => (
  <FooterWrapper>
    <RowFrame>
      <DarkLogoIcon />
      <FooterContent />
    </RowFrame>
  </FooterWrapper>
);

export default Footer;
