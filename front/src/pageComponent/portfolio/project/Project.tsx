import React, { useMemo, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import Router from 'next/router';
import removeMd from 'remove-markdown';

import PageContainer from '../../../component/pageContainer';
import PagePath from '../../../component/PagePath';
import TUIViewer from '../../../component/TUIViewer';
import SkillIcon from '../../../component/SkillIcon';
import Button from '../../../component/Button';
import { GET_PROJECT, DELETE_PROJECT } from '../../../queries/project.queries';
import { getProject_GetProject, deleteProject } from '../../../types/api';
import { GET_LOCAL_USER } from '../../../queries/client';
import { ProjectWrapper, ProjectHeader, SkillsWrapper } from './styled';
import { getAccessToken } from '../../../lib/cookie';

interface Props {
  GetProject: getProject_GetProject;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/portfolio', name: 'PORTFOLIO' },
];

const Project = ({ GetProject: { project } }: Props) => {
  const { data } = useQuery(GET_LOCAL_USER);
  const projectPath = useMemo(() => [...path, { path: `/portfolio/pproject/${project.id}`, name: project.title }], [
    project,
  ]);
  const [deleteProjectMutation] = useMutation<deleteProject>(DELETE_PROJECT, {
    variables: { id: project.id },
    onCompleted: ({ DeleteProject }) => {
      if (DeleteProject.ok) {
        Router.push('/portfolio');
      }
    },
  });

  const onClickDelete = useCallback(() => {
    const result = confirm('정말 게시글을 삭제하시겠습니까?');
    if (result) {
      deleteProjectMutation({
        context: {
          headers: {
            'X-JWT': getAccessToken(),
          },
        },
      });
    }
  }, []);

  return (
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
                {data?.isLoggedIn.userName && (
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
