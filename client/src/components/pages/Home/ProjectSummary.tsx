import React from 'react';

import RowFrame from '@frames/RowFrame';
import DetailButton from '@molecules/DetailButton';
import ProjectCard from '@organisms/ProjectCard';
import Title, { SMALL_SIZE } from '@atoms/Title';
import SubTitle from '@atoms/SubTitle';
import { GetPicked_getPickedProjects_projects as Project } from '@gql-types/api';
import styled from 'styled-components';

interface Props {
  data: Project[];
}

export const StyledProjectSummary = styled.article`
  padding: 40px 0;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.BORDER_LINE_GREY};

  & > section {
    margin: 40px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    grid-row-gap: 40px;

    @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
      grid-template-columns: 1fr;
      justify-items: left;
    }
  }
`;

const ProjectSummary = ({ data }: Props) => (
  <RowFrame>
    <StyledProjectSummary>
      <Title size={SMALL_SIZE} text="Project" align="center" />
      <SubTitle text="제가 개발을 진행하며 수행한 프로젝트입니다." align="center" />
      <section>
        {data.map((v) => (
          <ProjectCard key={`picked_project${v.id}`} projectInfo={v} />
        ))}
      </section>
      <DetailButton title="프로젝트" link="/portfolio" />
    </StyledProjectSummary>
  </RowFrame>
);

export default ProjectSummary;
