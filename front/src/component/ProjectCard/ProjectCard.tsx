import React from 'react';
import Link from 'next/link';

import { ProjectCardWrapper, NoImage, ProjectContent } from './styled';
import { getPickedProjects_GetPickedProjects_project } from '../../types/api';

interface Props {
  projectInfo: getPickedProjects_GetPickedProjects_project;
}

const ProjectCard = ({
  projectInfo: { id, titleImage, title, type, groupName, startDate, endDate, description },
}: Props) => (
  <Link href={`/project/${id}`}>
    <a>
      {' '}
      <ProjectCardWrapper>
        {titleImage ? <img src={titleImage} alt="project title" /> : <NoImage>NO IMAGE</NoImage>}
        <ProjectContent>
          <div>
            <h1>{title}</h1>
            <h2>{(type === 'GROUP' && groupName) || '개인 프로젝트'}</h2>
            <span>{`${startDate} ~ ${endDate || ''}`}</span>
          </div>
          <div>
            <span>{description}</span>
          </div>
        </ProjectContent>
      </ProjectCardWrapper>
    </a>
  </Link>
);

export default ProjectCard;
