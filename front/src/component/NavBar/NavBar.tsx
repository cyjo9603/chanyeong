import React, { useState, useCallback } from 'react';
import Link from 'next/link';

import NavIcon from './NavIcon';
import { NavBarWrapper } from './styled';

const NavBar = () => {
  const [hoverNav, setHoverNav] = useState(false);

  const onClickNav = useCallback(() => {
    setHoverNav(!hoverNav);
  }, [hoverNav]);

  const onMove = useCallback(() => {
    setHoverNav(false);
  }, []);

  return (
    <NavBarWrapper>
      <NavIcon onMouseEnter={onClickNav} />
      <ul className={hoverNav && 'menu-hover'}>
        <li onClick={onMove}>
          <Link href="/about">
            <a>ABOUT</a>
          </Link>
        </li>
        <li onClick={onMove}>
          <Link href="/skill">
            <a>SKILL</a>
          </Link>
        </li>
        <li onClick={onMove}>
          <Link href="/portfolio">
            <a>PORTFOLIO</a>
          </Link>
        </li>
        <li onClick={onMove}>
          <Link href="/blog">
            <a>BLOG</a>
          </Link>
        </li>
        <li onClick={onMove}>
          <Link href="/contact">
            <a>CONTACT</a>
          </Link>
        </li>
      </ul>
    </NavBarWrapper>
  );
};

export default NavBar;
