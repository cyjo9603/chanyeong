import React, { useState, useCallback, memo } from 'react';

import styled from '@theme/styled';
import PageLinkBox from '@molecules/PageLinkBox';
import ResponsiveMenu from './ResponseveMenu';

export const StyledPageNav = styled.nav`
  ul {
    display: flex;
    justify-content: space-between;
  }

  .menu-hover {
    flex-direction: column;
    height: 0;

    & li {
      text-align: left;
      padding-left: 14px;
      background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
      position: relative;
      right: 76px;
      width: 110px;
      display: block;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    position: relative;
    width: 60px;
    right: 0;
  }
`;

const PageNav = () => {
  const [hoverNav, setHoverNav] = useState(false);

  const onClickNav = useCallback(() => {
    setHoverNav(!hoverNav);
  }, [hoverNav]);

  const onMove = useCallback(() => {
    setHoverNav(false);
  }, []);

  return (
    <StyledPageNav>
      <ResponsiveMenu onClick={onClickNav} />
      <ul className={hoverNav && 'menu-hover'}>
        <PageLinkBox link="/about" text="ABOUT" onClick={onMove} />
        <PageLinkBox link="/portfolio" text="PORTFOLIO" onClick={onMove} />
        <PageLinkBox link="/blog" text="BLOG" onClick={onMove} />
        <PageLinkBox link="/contact" text="CONTACT" onClick={onMove} />
      </ul>
    </StyledPageNav>
  );
};

export default memo(PageNav);
