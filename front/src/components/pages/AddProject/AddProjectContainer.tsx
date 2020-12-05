// TODO: 코드 분리 및 리팩터링 필요
import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { useReissueMutation } from '@hooks/useApollo';

import useChangeEvent from '@src/hooks/useChangeEvent';
import { getAccessToken } from '@lib/cookie';

import { GET_SKILLS } from '@queries/skill.queries';
import {
  ADD_PROJECT,
  GET_PROJECT,
  UPDATE_PROJECT,
} from '@queries/project.queries';
import { GET_LOCAL_USER } from '@queries/client';
import {
  getSkills,
  addProject,
  getProject_GetProject_project,
  updateProject,
} from '@gql-types/api';
import AddProjectSection from './AddProjectSection';
import AddProjectHeader from './AddProjectHeader';

const MUTATION_ADD = 'ADD' as const;
const MUTATION_UPDATE = 'UPDATE' as const;

interface Props {
  project?: getProject_GetProject_project;
}

const AddProjectContainer = ({ project }: Props) => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const { data: skillsData } = useQuery<getSkills>(GET_SKILLS);
  const [content, setContent] = useState(project?.content || '');
  const [projectType, , onChangeProjectType] = useChangeEvent<
    HTMLSelectElement
  >(project?.type || 'PERSONAL');
  const [currentSkill, , onChangeCurrentSkill] = useChangeEvent<
    HTMLSelectElement
  >('');
  const [groupName, , onChangeGroupName] = useChangeEvent(
    project?.groupName || '',
  );
  const [title, , onChangeTitle] = useChangeEvent(project?.title || '');
  const [description, , onChangeDescription] = useChangeEvent(
    project?.description || '',
  );
  const [startDate, , onChangeStartDate] = useChangeEvent(
    project?.startDate || '',
  );
  const [endDate, , onChangeEndDate] = useChangeEvent(project?.endDate || '');
  const [githubAddr, , onChangeGithubAddr] = useChangeEvent(
    project?.githubAddr || '',
  );
  const [contribution, , onChangeContribution] = useChangeEvent(
    String(project?.contribution || ''),
  );
  const [skills, setSkills] = useState([]);
  const [deleteSkills, setDeleteSkills] = useState([]);
  const [titleImage, setTitleImage] = useState(project?.titleImage || '');
  const [image, setImage] = useState('');

  const getVariables = useCallback(
    (type: typeof MUTATION_UPDATE | typeof MUTATION_ADD) => {
      const variables = {
        content,
        groupName,
        description,
        endDate: endDate || null,
        contribution: contribution === '' ? 0 : parseInt(contribution, 10),
      };
      if (type === MUTATION_ADD) {
        return {
          ...variables,
          type: projectType,
          title,
          startDate,
          githubAddr: githubAddr || null,
          titleImage: titleImage || null,
          skillIds: skills.map((v) => v.id),
        };
      }
      return {
        ...variables,
        id: project?.id,
        githubAddr,
        titleImage,
        deleteSkills,
        addSkills: skills.map((v) => v.id),
      };
    },
    [
      content,
      projectType,
      groupName,
      title,
      description,
      startDate,
      endDate,
      githubAddr,
      titleImage,
      contribution,
      skills,
      project,
    ],
  );

  const [addProjectMutation] = useReissueMutation<addProject>(ADD_PROJECT, {
    onCompleted: async ({ AddProject }) => {
      if (AddProject.ok) {
        Router.push('/portfolio');
      }
    },
  });
  const [updateProjectMutation] = useReissueMutation<updateProject>(
    UPDATE_PROJECT,
    {
      onCompleted: async ({ UpdateProject }) => {
        if (UpdateProject.ok) {
          Router.push('/portfolio');
        }
      },
    },
  );

  useEffect(() => {
    if (project?.Skills.length) {
      const saveSkills = [...project.Skills];
      setSkills(saveSkills);
    }
  }, []);

  useEffect(() => {
    if (!userInfo.isLoggedIn.userName) {
      Router.push('/');
    }
  }, [userInfo]);

  useEffect(() => {
    if (titleImage === '') {
      setTitleImage(image);
    }
  }, [image]);

  const onSubmit = useCallback(() => {
    if (projectType && title && content && description && startDate) {
      const context = { headers: { 'X-JWT': getAccessToken() } };
      if (project) {
        const variables = getVariables(MUTATION_UPDATE);
        updateProjectMutation({
          variables,
          context,
        });
      } else {
        const variables = getVariables(MUTATION_ADD);
        addProjectMutation({
          variables,
          context,
        });
      }
    }
  }, [
    content,
    projectType,
    groupName,
    title,
    description,
    startDate,
    endDate,
    githubAddr,
    titleImage,
    contribution,
    skills,
    project,
  ]);

  const onClickAddSkill = useCallback(() => {
    if (skillsData?.GetSkills.skill && currentSkill) {
      const { skill } = skillsData?.GetSkills;
      const skillIndex = skill.findIndex((v) => v.id === Number(currentSkill));
      const newSkill = { ...skill[skillIndex] };
      const newSkills = [...skills, newSkill];
      setSkills(newSkills);
    }
  }, [skillsData, skills, currentSkill]);

  const onClickRemoveSkill = useCallback(
    (id: number) => {
      const deleteIndex = skills.findIndex((v) => v.id === id);
      if (deleteIndex !== -1) {
        const newDeleteSkills = [...deleteSkills, id];
        const newSkills = [...skills];
        newSkills.splice(deleteIndex, 1);
        setDeleteSkills(newDeleteSkills);
        setSkills(newSkills);
      }
    },
    [skills, deleteSkills],
  );

  return (
    <>
      <AddProjectHeader
        title={title}
        project={project}
        projectType={projectType}
        groupName={groupName}
        contribution={contribution}
        description={description}
        githubAddr={githubAddr}
        startDate={startDate}
        endDate={endDate}
        onChangeTitle={onChangeTitle}
        onChangeProjectType={onChangeProjectType}
        onChangeGroupName={onChangeGroupName}
        onChangeContribution={onChangeContribution}
        onChangeDescription={onChangeDescription}
        onChangeGithubAddr={onChangeGithubAddr}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
      />
      <AddProjectSection
        content={content}
        skills={skillsData?.GetSkills.skill || []}
        currentSkills={skills}
        onChangeContent={setContent}
        setImage={setImage}
        onSubmit={onSubmit}
        onChangeCurrentSkill={onChangeCurrentSkill}
        onClickAddSkill={onClickAddSkill}
        onClickRemoveSkill={onClickRemoveSkill}
      />
    </>
  );
};

AddProjectContainer.getInitialProps = async (context) => {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;
    const { apolloClient } = context;
    const projectData = await apolloClient.query({
      query: GET_PROJECT,
      variables: { id: parseInt(id, 10) },
    });
    return projectData.data?.GetProject;
  }
};

export default AddProjectContainer;
