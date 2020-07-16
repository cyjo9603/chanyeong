import React, { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import Router from 'next/router';

import ProjectPresenter from './ProjectPresenter';
import { GET_PROJECT, DELETE_PROJECT, FIX_PROJECT } from '../../queries/project.queries';
import { getProject_GetProject, deleteProject, fixProject } from '../../types/api';
import { GET_LOCAL_USER } from '../../queries/client';
import { getAccessToken } from '../../lib/cookie';
import { reissuanceAccessToken, ERROR_EXPIRATION } from '../../lib/reissuanceAccessToken';

const FIX_PROJECT_TRUE = '프로젝트 고정' as const;
const FIX_PROJECT_FALSE = '프로젝트 고정 해제' as const;

export type FixProject = typeof FIX_PROJECT_TRUE | typeof FIX_PROJECT_FALSE;

interface Props {
  GetProject: getProject_GetProject;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/portfolio', name: 'PORTFOLIO' },
];

const ProjectContainer = ({ GetProject: { project } }: Props) => {
  const apollo = useApolloClient();
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const [isFixed, setIsFixed] = useState(project.picked ? FIX_PROJECT_FALSE : FIX_PROJECT_TRUE);
  const projectPath = useMemo(() => [...path, { name: project.title }], [project.title]);
  const [deleteProjectMutation] = useMutation<deleteProject>(DELETE_PROJECT, {
    variables: { id: project.id },
    onCompleted: async ({ DeleteProject }) => {
      if (DeleteProject.error === ERROR_EXPIRATION) {
        const token = await reissuanceAccessToken(apollo);
        if (token) {
          deleteProjectMutation({ context: { headers: { 'X-JWT': token } } });
        }
      }
      if (DeleteProject.ok) {
        Router.push('/portfolio');
      }
    },
  });
  const [fixProjecttMutation] = useMutation<fixProject>(FIX_PROJECT, {
    variables: { id: project.id, fix: isFixed === FIX_PROJECT_TRUE },
    onCompleted: async ({ FixProject }) => {
      if (FixProject.error === ERROR_EXPIRATION) {
        const token = await reissuanceAccessToken(apollo);
        if (token) {
          fixProjecttMutation({ context: { headers: { 'X-JWT': token } } });
        }
      }
      if (FixProject.ok) {
        setIsFixed(isFixed === FIX_PROJECT_TRUE ? FIX_PROJECT_FALSE : FIX_PROJECT_TRUE);
      }
    },
  });

  const onClickFix = useCallback(() => {
    fixProjecttMutation({
      context: {
        headers: {
          'X-JWT': getAccessToken(),
        },
      },
    });
  }, []);

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
    <ProjectPresenter
      isFixed={isFixed}
      project={project}
      userInfo={userInfo}
      projectPath={projectPath}
      onClickDelete={onClickDelete}
      onClickFix={onClickFix}
    />
  );
};

ProjectContainer.getInitialProps = async (context) => {
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

export default ProjectContainer;
