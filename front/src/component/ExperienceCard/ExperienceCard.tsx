import React, { useMemo } from 'react';

import { getAbouts_GetExperiences_experiences } from '@gql-types/api';
import newLine from '@lib/newLine';
import { ExperienceCardWrapper, ExperienceDate, ExperienceContent, Term } from './styled';

interface Props {
  experience: getAbouts_GetExperiences_experiences;
}

const ExperienceCard = ({ experience }: Props) => {
  const term = useMemo(() => {
    const dateGap = +new Date(experience.endDate || Date.now()) - +new Date(experience.startDate);
    return Math.round(dateGap / (1000 * 60 * 60 * 24 * 30));
  }, []);

  return (
    <ExperienceCardWrapper>
      <ExperienceDate>
        <span>{`${experience.startDate} ~ ${experience.endDate || '진행 중'}`}</span>
        <Term>{`${term}개월`}</Term>
      </ExperienceDate>
      <ExperienceContent>
        <h1>{experience.title}</h1>
        <div>{newLine(experience.content)}</div>
      </ExperienceContent>
    </ExperienceCardWrapper>
  );
};

export default ExperienceCard;
