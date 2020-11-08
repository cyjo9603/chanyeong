import React, { useState, useCallback, useEffect, useMemo } from 'react';

import UserStatusNav from '@organisms/UserStatusNav';
import HeaderSection from '@organisms/HeaderSection';

const HIDDEN_STATUSBAR = 0.3 as const;

const Header = () => {
  const [scrollRatio, setScrollRatio] = useState(0);
  const statusHidden = useMemo(() => scrollRatio > HIDDEN_STATUSBAR, [
    scrollRatio,
  ]);

  const onScroll = useCallback(() => {
    const { scrollTop } = document.body;

    if (scrollTop <= 100 && scrollTop >= 0) {
      const currentScrollRatio = scrollTop / 100;
      setScrollRatio(currentScrollRatio);
    } else if (scrollTop > 100 && scrollRatio !== 1) {
      setScrollRatio(1);
    }
  }, [scrollRatio]);

  useEffect(() => {
    document.body.addEventListener('scroll', onScroll);

    return () => document.body.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <>
      <UserStatusNav statusHidden={statusHidden} />
      <HeaderSection scrollRatio={scrollRatio} statusHidden={statusHidden} />
    </>
  );
};

export default Header;
