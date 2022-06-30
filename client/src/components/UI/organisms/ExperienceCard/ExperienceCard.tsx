import React from 'react';

import styled from 'styled-components';
import { GetAbouts_getExperiences_experiences as Experiences } from '@gql-types/api';

import ExperienceDate from './ExperienceDate';
import ExperienceContent from './ExperienceContent';

const ExperienceCardWrapper = styled.div`
  display: flex;
  margin-top: 8px;
  margin-left: 16px;

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    margin-left: 4px;
    flex-direction: column;
  }
`;

interface Props {
  experience: Experiences;
}

const ExperienceCard = ({ experience }: Props) => (
  <ExperienceCardWrapper>
    <ExperienceDate startDate={experience.startDate} endDate={experience.endDate} />
    <ExperienceContent title={experience.title} content={experience.content} />
  </ExperienceCardWrapper>
);

export default ExperienceCard;
