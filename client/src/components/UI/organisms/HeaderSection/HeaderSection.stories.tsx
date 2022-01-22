import React from 'react';
import { number } from '@storybook/addon-knobs';

import HeaderSection from '.';

export default {
  title: 'Organisms/HeaderSection',
  component: HeaderSection,
};

export const LightMode = () => {
  const scrollRatio = number('scroll', 0);
  return (
    <HeaderSection
      scrollRatio={scrollRatio / 100}
      statusHidden={scrollRatio / 100 > 0.3}
    />
  );
};
