import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import auth from '@hoc/auth';
import { initializeApollo } from '@src/apollo';
import useChangeEvent from '@src/hooks/useChangeEvent';
import { GET_SKILLS } from '@queries/skill.queries';
import { ADD_PROJECT, GET_PROJECT, UPDATE_PROJECT } from '@queries/project.queries';
import {
  getSkills,
  addProject,
  getProject_GetProject_project,
  updateProject,
} from '@gql-types/api';
import { addProjectMapper, updateProjectMapper } from '@src/mappers/project';
import AddProjectSection from './AddProjectSection';
import AddProjectHeader from './AddProjectHeader';

interface Props {
  project?: getProject_GetProject_project;
}

const AddProjectContainer: NextPage<Props> = auth(({ project }) => {
  const { register, handleSubmit, watch } = useForm();
  const watchProjectType = watch('projectType');
  const { data: skillsData } = useQuery<getSkills>(GET_SKILLS);
  const [content, setContent] = useState(project?.content || '');
  const [currentSkill, , onChangeCurrentSkill] = useChangeEvent<HTMLSelectElement>('');
  const [skills, setSkills] = useState([]);
  const [deleteSkills, setDeleteSkills] = useState([]);
  const [titleImage, setTitleImage] = useState(project?.titleImage || '');
  const [image, setImage] = useState('');

  const [addProjectMutation] = useMutation<addProject>(ADD_PROJECT, {
    onCompleted: async ({ AddProject }) => {
      if (AddProject.ok) {
        Router.push('/portfolio');
      }
    },
  });
  const [updateProjectMutation] = useMutation<updateProject>(UPDATE_PROJECT, {
    onCompleted: async ({ UpdateProject }) => {
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
    if (titleImage === '') {
      setTitleImage(image);
    }
  }, [image]);

  const onSubmit = (values) => {
    if (!content) {
      return;
    }
    if (project) {
      updateProjectMutation({
        variables: updateProjectMapper(
          values,
          project.id,
          content,
          titleImage,
          deleteSkills,
          skills,
        ),
      });
      return;
    }
    addProjectMutation({ variables: addProjectMapper(values, content, titleImage, skills) });
  };

  const onClickAddSkill = useCallback(() => {
    if (skillsData?.GetSkills.skill && currentSkill) {
      const { skill } = skillsData?.GetSkills;
      const skillIndex = skill.findIndex((v) => v.id === Number(currentSkill));
      const newSkills = [...skills, { ...skill[skillIndex] }];
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <AddProjectHeader register={register} project={project} projectType={watchProjectType} />
      <AddProjectSection
        content={content}
        skills={skillsData?.GetSkills.skill || []}
        currentSkills={skills}
        onChangeContent={setContent}
        setImage={setImage}
        onChangeCurrentSkill={onChangeCurrentSkill}
        onClickAddSkill={onClickAddSkill}
        onClickRemoveSkill={onClickRemoveSkill}
      />
    </form>
  );
});

AddProjectContainer.getInitialProps = async (context) => {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;
    const apolloClient = initializeApollo();
    const projectData = await apolloClient.query({
      query: GET_PROJECT,
      variables: { id: parseInt(id, 10) },
    });
    return projectData.data?.GetProject;
  }
};

export default AddProjectContainer;
