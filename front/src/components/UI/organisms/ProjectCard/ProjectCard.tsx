import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  GetPicked_getPickedProjects_projects as PickedProject,
  GetProjects_getProjects_projects as Project,
} from '@gql-types/api';
import styled from '@theme/styled';

import ProjectCardMain from './ProjectCardMain';
import ProjectCardDescription from './ProjectCardDescription';

interface Props {
  projectInfo: PickedProject | Project;
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
  projectInfo: { id, titleImage, title, type, groupName, startDate, endDate, description },
}: Props) => (
  <Link href={`/portfolio/project/${id}`} prefetch={false}>
    <a>
      <StyledProjectCard>
        {titleImage && <Image src={titleImage} alt="project title" width={120} height={80} />}
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
