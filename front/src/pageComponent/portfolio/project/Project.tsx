import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';

import PageContainer from '../../../component/pageContainer';
import PagePath from '../../../component/PagePath';
import TUIViewer from '../../../component/TUIViewer';
import SkillIcon from '../../../component/SkillIcon';
import { GET_PROJECT } from '../../../queries/project.queries';
import { getProject_GetProject } from '../../../types/api';
import { ProjectWrapper, ProjectHeader, SkillsWrapper } from './styled';

interface Props {
  GetProject: getProject_GetProject;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/portfolio', name: 'PORTFOLIO' },
];

const Project = ({ GetProject: { project } }: Props) => {
  const projectPath = useMemo(() => [...path, { path: `/blog/post/${project.id}`, name: project.title }], [project]);
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.css" />
      </Helmet>
      <PageContainer>
        <ProjectWrapper>
          <PagePath data={projectPath} />
          <section>
            <ProjectHeader>
              <h1>{project.title}</h1>
              {project.groupName && (
                <div>
                  <span>{project.groupName} </span>
                </div>
              )}
              <div>
                <span>{project.startDate} ~ </span>
                {project.endDate && <span>{project.endDate}</span>}
              </div>
              <div>
                <span>GitHub : </span>
                <span>
                  <a href={project.githubAddr} target="_blank" rel="noopener noreferrer">
                    {project.githubAddr}
                  </a>
                </span>
              </div>
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
};

Project.getInitialProps = async (context) => {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;
    const { apolloClient } = context;
    const postData = await apolloClient.query({
      query: GET_PROJECT,
      variables: { id: parseInt(id, 10) },
    });
    return postData.data;
  }
};

export default Project;
