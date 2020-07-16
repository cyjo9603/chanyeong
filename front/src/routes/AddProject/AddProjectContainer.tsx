import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';

import { getAccessToken } from '../../lib/cookie';
import { reissuanceAccessToken, ERROR_EXPIRATION } from '../../lib/reissuanceAccessToken';
import { GET_SKILLS } from '../../queries/skill.queries';
import { ADD_PROJECT, GET_PROJECT, UPDATE_PROJECT } from '../../queries/project.queries';
import { getSkills, addProject, getProject_GetProject_project, updateProject } from '../../types/api';
import { GET_LOCAL_USER } from '../../queries/client';
import AddProjectPresenter from './AddProjectPresenter';

const MUTATION_ADD = 'ADD' as const;
const MUTATION_UPDATE = 'UPDATE' as const;

interface Props {
  project?: getProject_GetProject_project;
}

const useInput = <T extends { value: string }>(initValue: string): [string, (e: React.ChangeEvent<T>) => void] => {
  const [value, setValue] = useState(initValue);

  const onChangeValue = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeValue];
};

const AddProjectContainer = ({ project }: Props) => {
  const apollo = useApolloClient();
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const { data: skillsData } = useQuery<getSkills>(GET_SKILLS);
  const [content, setContent] = useState(project?.content || '');
  const [projectType, setProjectType] = useInput<HTMLSelectElement>(project?.type || 'PERSONAL');
  const [currentSkill, setCurrentSkill] = useInput<HTMLSelectElement>('');
  const [groupName, setGroupName] = useInput<HTMLInputElement>(project?.groupName || '');
  const [title, setTitle] = useInput<HTMLInputElement>(project?.title || '');
  const [description, setDescription] = useInput<HTMLInputElement>(project?.description || '');
  const [startDate, setStartDate] = useInput<HTMLInputElement>(project?.startDate || '');
  const [endDate, setEndDate] = useInput<HTMLInputElement>(project?.endDate || '');
  const [githubAddr, setGithubAddr] = useInput<HTMLInputElement>(project?.githubAddr || '');
  const [contribution, setContribution] = useInput<HTMLInputElement>(String(project?.contribution || ''));
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

  const [addProjectMutation] = useMutation<addProject>(ADD_PROJECT, {
    onCompleted: async ({ AddProject }) => {
      if (AddProject.error === ERROR_EXPIRATION) {
        const token = await reissuanceAccessToken(apollo);
        if (token) {
          const variables = getVariables(MUTATION_ADD);
          addProjectMutation({ variables, context: { headers: { 'X-JWT': token } } });
        }
      }
      if (AddProject.ok) {
        Router.push('/portfolio');
      }
    },
  });
  const [updateProjectMutation] = useMutation<updateProject>(UPDATE_PROJECT, {
    onCompleted: async ({ UpdateProject }) => {
      if (UpdateProject.error === ERROR_EXPIRATION) {
        const token = await reissuanceAccessToken(apollo);
        if (token) {
          const variables = getVariables(MUTATION_UPDATE);
          updateProjectMutation({ variables, context: { headers: { 'X-JWT': token } } });
        }
      }
      if (UpdateProject.ok) {
        Router.push('/portfolio');
      }
    },
  });

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
    <AddProjectPresenter
      title={title}
      project={project}
      projectType={projectType}
      groupName={groupName}
      contribution={contribution}
      description={description}
      githubAddr={githubAddr}
      startDate={startDate}
      endDate={endDate}
      content={content}
      skills={skillsData?.GetSkills.skill || []}
      currentSkills={skills}
      onChangeTitle={setTitle}
      onChangeProjectType={setProjectType}
      onChangeGroupName={setGroupName}
      onChangeContribution={setContribution}
      onChangeDescription={setDescription}
      onChangeGithubAddr={setGithubAddr}
      onChangeStartDate={setStartDate}
      onChangeEndDate={setEndDate}
      onChangeContent={setContent}
      setImage={setImage}
      onSubmit={onSubmit}
      onChangeCurrentSkill={setCurrentSkill}
      onClickAddSkill={onClickAddSkill}
      onClickRemoveSkill={onClickRemoveSkill}
    />
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
