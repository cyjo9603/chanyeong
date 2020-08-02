import React, { useEffect } from 'react';
import AboutPresenter from './AboutPresenter';

const AboutContainer = () => {
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  return <AboutPresenter />;
};

export default AboutContainer;
