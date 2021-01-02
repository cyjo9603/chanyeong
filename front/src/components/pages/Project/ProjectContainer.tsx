import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Router from 'next/router';
import removeMd from 'remove-markdown';

import { initializeApollo } from '@src/apollo';
import { useReissueMutation } from '@hooks/useApollo';
import { GET_LOCAL_USER } from '@queries/client';
import {
  GET_PROJECT,
  DELETE_PROJECT,
  FIX_PROJECT,
} from '@queries/project.queries';
import {
  getProject_GetProject,
  deleteProject,
  fixProject,
} from '@gql-types/api';
import ProjectPresenter from './ProjectPresenter';

const FIX_PROJECT_TRUE = '프로젝트 고정' as const;
const FIX_PROJECT_FALSE = '프로젝트 고정 해제' as const;

export type FixProject = typeof FIX_PROJECT_TRUE | typeof FIX_PROJECT_FALSE;

const MAX_DESCRIPTION = 200 as const;

interface Props {
  GetProject: getProject_GetProject;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/portfolio', name: 'PORTFOLIO' },
];

const ProjectContainer = ({ GetProject }: Props) => {
  const { project } = useMemo(() => GetProject || { project: null }, []);
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const [isFixed, setIsFixed] = useState(
    project?.picked ? FIX_PROJECT_FALSE : FIX_PROJECT_TRUE,
  );
  const projectPath = useMemo(() => [...path, { name: project?.title }], []);
  const projectDescription = useMemo(
    () =>
      removeMd(project?.content, { useImgAltText: false }).slice(
        0,
        MAX_DESCRIPTION,
      ),
    [],
  );
  const [deleteProjectMutation] = useReissueMutation<deleteProject>(
    DELETE_PROJECT,
    {
      variables: { id: project?.id },
      onCompleted: async ({ DeleteProject }) => {
        if (DeleteProject.ok) {
          Router.push('/portfolio');
        }
      },
    },
  );
  const [fixProjecttMutation] = useReissueMutation<fixProject>(FIX_PROJECT, {
    variables: { id: project?.id, fix: isFixed === FIX_PROJECT_TRUE },
    onCompleted: async ({ FixProject }) => {
      if (FixProject.ok) {
        setIsFixed(
          isFixed === FIX_PROJECT_TRUE ? FIX_PROJECT_FALSE : FIX_PROJECT_TRUE,
        );
      }
    },
  });

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const onClickFix = useCallback(() => {
    fixProjecttMutation();
  }, []);

  const onClickDelete = useCallback(() => {
    const result = confirm('정말 게시글을 삭제하시겠습니까?');
    if (result) {
      deleteProjectMutation();
    }
  }, []);

  return project ? (
    <ProjectPresenter
      isFixed={isFixed}
      project={project}
      userInfo={userInfo}
      projectDescription={projectDescription}
      projectPath={projectPath}
      onClickDelete={onClickDelete}
      onClickFix={onClickFix}
    />
  ) : (
    <></>
  );
};

ProjectContainer.getInitialProps = async (context) => {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;
    const apolloClient = initializeApollo();
    const postData = await apolloClient.query({
      query: GET_PROJECT,
      variables: { id: parseInt(id, 10) },
      fetchPolicy: 'no-cache',
    });
    return postData.data;
  }
};

export default ProjectContainer;
