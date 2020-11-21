import React from 'react';
import Link from 'next/link';

import {
  getPicked_GetPickedProjects_project,
  getProjects_GetProjects_project,
} from '@gql-types/api';
import styled from '@theme/styled';

import ProjectCardMain from './ProjectCardMain';
import ProjectCardDescription from './ProjectCardDescription';

interface Props {
  projectInfo:
    | getPicked_GetPickedProjects_project
    | getProjects_GetProjects_project;
}

const StyledProjectCard = styled.div`
  display: flex;
  width: 520px;
  height: 80px;
  border: 1px solid ${({ theme }) => theme.CARD_BORDER};
  transition: box-shadow 0.3s, border-color 0.3s;

  & > img {
    width: 120px;
    height: 100%;
  }

  &:hover {
    box-shadow: 3px 3px 3px ${({ theme }) => theme.CARD_BORDER};
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 320px;
  }
`;

const ProjectCard = ({
  projectInfo: {
    id,
    titleImage,
    title,
    type,
    groupName,
    startDate,
    endDate,
    description,
  },
}: Props) => (
  <Link
    href={{ pathname: '/portfolio/project', query: { id } }}
    as={`/portfolio/project/${id}`}
  >
    <a>
      <StyledProjectCard>
        {titleImage && <img src={titleImage} alt="project title" />}
        <ProjectCardMain
          title={title}
          type={type}
          groupName={groupName}
          startDate={startDate}
          endDate={endDate}
        />
        <ProjectCardDescription description={description} />
      </StyledProjectCard>
    </a>
  </Link>
);

export default ProjectCard;
