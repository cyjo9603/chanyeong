import React, { FC } from 'react';

import RowFrame from '@frames/RowFrame';
import LogoIcon, { LOGO_TYPE_DARK } from '@svg-icons/LogoIcon';
import FooterContent from '@molecules/FooterContent';
import styled from 'styled-components';

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
      <LogoIcon type={LOGO_TYPE_DARK} />
      <FooterContent />
    </RowFrame>
  </FooterWrapper>
);

export default Footer;
