import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PageContainer from '../../component/pageContainer';
import { ProjectSummaryWrapper, ArticleHeader } from './styled';
import DetailButton from '../../component/DetailButton';
import ProjectCard from '../../component/ProjectCard';

import { GET_PICKED_PROJECTS } from '../../queries/project.queries';
import { getPickedProjects } from '../../types/api';

const ProjectSummary = () => {
  const { data } = useQuery<getPickedProjects>(GET_PICKED_PROJECTS);

  return (
    <PageContainer>
      <ProjectSummaryWrapper>
        <ArticleHeader>
          <h1>Project</h1>
          <h2>제가 개발을 진행하며 수행한 프로젝트입니다.</h2>
        </ArticleHeader>
        <section>
          {data?.GetPickedProjects?.project.map((v) => (
            <ProjectCard key={`picked_project${v.id}`} projectInfo={v} />
          ))}
        </section>
        <div>
          <DetailButton title="프로젝트" link="/portfolio" />
        </div>
      </ProjectSummaryWrapper>
    </PageContainer>
  );
};

export default ProjectSummary;
