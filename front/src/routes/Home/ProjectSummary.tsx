import React from 'react';

import PageContainer from '@component/pageContainer';
import DetailButton from '@component/DetailButton';
import ProjectCard from '@component/ProjectCard';
import { getPicked_GetPickedProjects_project } from '@gql-types/api';
import { ProjectSummaryWrapper, ArticleHeader } from './styled';

interface Props {
  data: getPicked_GetPickedProjects_project[];
}

const ProjectSummary = ({ data }: Props) => (
  <PageContainer>
    <ProjectSummaryWrapper>
      <ArticleHeader>
        <h1>Project</h1>
        <h2>제가 개발을 진행하며 수행한 프로젝트입니다.</h2>
      </ArticleHeader>
      <section>
        {data.map((v) => (
          <ProjectCard key={`picked_project${v.id}`} projectInfo={v} />
        ))}
      </section>
      <div>
        <DetailButton title="프로젝트" link="/portfolio" />
      </div>
    </ProjectSummaryWrapper>
  </PageContainer>
);

export default ProjectSummary;
