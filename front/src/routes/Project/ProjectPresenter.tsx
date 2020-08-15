import React from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import removeMd from 'remove-markdown';

import PageContainer from '../../component/pageContainer';
import PagePath from '../../component/PagePath';
import TUIViewer from '../../component/TUIViewer';
import SkillIcon from '../../component/SkillIcon';
import Button from '../../commons/Button';
import { ProjectWrapper, ProjectHeader, SkillsWrapper } from './styled';
import { getProject_GetProject_project } from '../../types/api';
import { LocalSignIn } from '../../apollo';
import { FixProject } from './ProjectContainer';

interface Props {
  isFixed: FixProject;
  project?: getProject_GetProject_project;
  userInfo?: LocalSignIn;
  projectPath: {
    path?: string;
    name: string;
  }[];
  onClickDelete: () => void;
  onClickFix: () => void;
}

const ProjectPresenter = ({ isFixed, project, userInfo, projectPath, onClickDelete, onClickFix }: Props) => (
  <>
    <Helmet>
      <title>{project.title} :: chanyeong</title>
      <meta name="description" content={removeMd(project.content, { useImgAltText: false })} />
      <meta name="og:title" content={`${project.title} - chanyeong`} />
      <meta name="og:description" content={removeMd(project.content, { useImgAltText: false })} />
      <meta name="og:image" content={project.titleImage} />
      <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.css" />
    </Helmet>
    <PageContainer>
      <ProjectWrapper>
        <PagePath data={projectPath} page={`project_${project.title}`} />
        <section>
          <ProjectHeader>
            <h1>{project.title}</h1>
            {project.groupName && (
              <div>
                <span>{project.groupName} </span>
              </div>
            )}
            <div>
              {userInfo?.isLoggedIn.userName && (
                <>
                  <Button name="제거" align="right" onClick={onClickDelete} />
                  <Link
                    href={{ pathname: '/portfolio/add', query: { id: project.id } }}
                    as={`/portfolio/add/${project.id}`}
                  >
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
          </ProjectHeader>
          <TUIViewer content={project.content} />
          <SkillsWrapper>
            <h3>적용 기술</h3>
            {project?.Skills.map((v) => (
              <SkillIcon key={`view_project_skill_icon_${v.id}`} icon={v.icon} name={v.name} />
            ))}
          </SkillsWrapper>
        </section>
      </ProjectWrapper>
    </PageContainer>
  </>
);

export default ProjectPresenter;
