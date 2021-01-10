import React, { FC, useMemo } from 'react';
import Link from 'next/link';

import styled from '@theme/styled';
import LogoIcon from '@svg-icons/LogoIcon';

interface Props {
  scrollRatio: number;
}

interface StyledProps {
  logoWidth: number;
}

const StyledScrollLogo = styled.div<StyledProps>`
  width: ${({ logoWidth }) => logoWidth}px;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 200px;
  }
`;

const ScrollLogo: FC<Props> = ({ scrollRatio }) => {
  const logoWidth = useMemo(() => 250 - 70 * scrollRatio, [scrollRatio]);

  return (
    <StyledScrollLogo logoWidth={logoWidth}>
      <Link href="/" prefetch={false}>
        <a>
          <LogoIcon />
        </a>
      </Link>
    </StyledScrollLogo>
  );
};

export default ScrollLogo;
