import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { useMutation, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import removeMd from 'remove-markdown';

import { userInfoVar } from '@store/userInfo';
import { DELETE_PROJECT, FIX_PROJECT } from '@queries/project.queries';
import {
  getProject_GetProject_project as Project,
  deleteProject,
  fixProject,
} from '@gql-types/api';
import ProjectPresenter from './ProjectPresenter';

const FIX_PROJECT_TRUE = '프로젝트 고정' as const;
const FIX_PROJECT_FALSE = '프로젝트 고정 해제' as const;

export type FixProject = typeof FIX_PROJECT_TRUE | typeof FIX_PROJECT_FALSE;

const MAX_DESCRIPTION = 200 as const;

interface Props {
  project: Project;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/portfolio', name: 'PORTFOLIO' },
];

const ProjectContainer = ({ project }: Props) => {
  const router = useRouter();
  const userInfo = useReactiveVar(userInfoVar);
  const [isFixed, setIsFixed] = useState(project?.picked ? FIX_PROJECT_FALSE : FIX_PROJECT_TRUE);
  const projectPath = useMemo(() => [...path, { name: project?.title }], []);
  const projectDescription = useMemo(
    () => removeMd(project?.content, { useImgAltText: false }).slice(0, MAX_DESCRIPTION),
    [],
  );
  const [deleteProjectMutation] = useMutation<deleteProject>(DELETE_PROJECT, {
    variables: { id: project?.id },
    onCompleted: async ({ DeleteProject }) => {
      if (DeleteProject.ok) {
        router.push('/portfolio');
      }
    },
  });
  const [fixProjecttMutation] = useMutation<fixProject>(FIX_PROJECT, {
    variables: { id: project?.id, fix: isFixed === FIX_PROJECT_TRUE },
    onCompleted: async ({ FixProject }) => {
      if (FixProject.ok) {
        setIsFixed(isFixed === FIX_PROJECT_TRUE ? FIX_PROJECT_FALSE : FIX_PROJECT_TRUE);
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
      userName={userInfo.userName}
      projectDescription={projectDescription}
      projectPath={projectPath}
      onClickDelete={onClickDelete}
      onClickFix={onClickFix}
    />
  ) : (
    <></>
  );
};

export default ProjectContainer;
