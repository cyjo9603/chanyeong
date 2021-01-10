import React from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';

import styled from '@theme/styled';
import RowFrame from '@frames/RowFrame';
import MarkdownViewer from '@organisms/MarkDownViewer';
import SkillIconList from '@organisms/SkillIconList';
import BreadCrumbs from '@molecules/BreadCrumbs';
import Button from '@atoms/Button';
import HugeText from '@atoms/HugeText';
import { getProject_GetProject_project } from '@gql-types/api';
import { FixProject } from './ProjectContainer';

interface Props {
  isFixed: FixProject;
  project?: getProject_GetProject_project;
  userName?: string;
  projectDescription: string;
  projectPath: {
    path?: string;
    name: string;
  }[];
  onClickDelete: () => void;
  onClickFix: () => void;
}

const StyledProject = styled.div`
  margin-bottom: 80px;

  & header {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.PRIMARY_FONT};

    & > div {
      margin-bottom: 10px;
    }

    & a {
      color: ${({ theme }) => theme.PRIMARY_FONT};
    }

    & button {
      margin-left: 8px;
    }
  }
`;

const ProjectPresenter = ({
  isFixed,
  project,
  userName,
  projectDescription,
  projectPath,
  onClickDelete,
  onClickFix,
}: Props) => (
  <>
    <Helmet>
      <title>{project.title} :: chanyeong</title>
      <meta name="description" content={`${projectDescription}...`} />
      <meta name="og:title" content={`${project.title} - chanyeong`} />
      <meta name="og:description" content={`${projectDescription}...`} />
      <meta name="og:image" content={project.titleImage} />
      <link
        rel="stylesheet"
        href="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.css"
      />
    </Helmet>
    <RowFrame>
      <StyledProject>
        <BreadCrumbs data={projectPath} page={`project_${project.title}`} />
        <section>
          <header>
            <HugeText text={project.title} />
            {project.groupName && (
              <div>
                <span>{project.groupName} </span>
              </div>
            )}
            <div>
              {userName && (
                <>
                  <Button name="제거" align="right" onClick={onClickDelete} />
                  <Link href={`/portfolio/add/${project.id}`}>
                    <a>
                      <Button name="편집" align="right" />
                    </a>
                  </Link>
                  <Button name={isFixed} align="right" onClick={onClickFix} />
                </>
              )}
              <span>{project.startDate} ~ </span>
              {project.endDate && <span>{project.endDate}</span>}
            </div>
            {project.githubAddr && (
              <div>
                <span>GitHub : </span>
                <span>
                  <a href={project.githubAddr} target="_blank" rel="noopener noreferrer">
                    {project.githubAddr}
                  </a>
                </span>
              </div>
            )}
          </header>
          <MarkdownViewer content={project.content} />
          <SkillIconList title="적용 기술" skills={project?.Skills || []} />
        </section>
      </StyledProject>
    </RowFrame>
  </>
);

export default ProjectPresenter;
