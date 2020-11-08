import React from 'react';
import { text, date } from '@storybook/addon-knobs';

import ExperienceCard from '.';

export default {
  title: 'Organisms/ExperienceCard',
  component: ExperienceCard,
};

export const LightMode = () => {
  const title = text('title', 'title');
  const content = text('content', 'title');
  const start = date('startDate');
  const end = date('endDate');

  const startDate = new Date(start).toLocaleDateString().slice(0, -1);
  const endDate = new Date(end).toLocaleDateString().slice(0, -1);
  console.log(startDate);

  return (
    <ExperienceCard
      experience={{ title, content, startDate, endDate } as any}
    />
  );
};
