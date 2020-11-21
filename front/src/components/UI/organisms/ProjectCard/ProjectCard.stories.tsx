import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import ProjectCard from '.';

export default {
  title: 'Organisms/ProjectCard',
  component: ProjectCard,
};

export const Default = () => {
  const title = text('title', 'title');
  const content = text('content', 'content');
  const groupName = text('groupName', 'groupName');
  const description = text('description', 'description');
  const type = select('type', ['PERSONAL', 'GROUP'], 'PERSONAL');
  return (
    <ProjectCard
      projectInfo={
        {
          id: 1,
          titleImage: 'test',
          title,
          content,
          type,
          groupName,
          startDate: '1995-10-10',
          endDate: '1995-10-10',
          description,
        } as any
      }
    />
  );
};
