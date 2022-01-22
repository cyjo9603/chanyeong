import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import auth from '@hoc/auth';
import useChangeEvent from '@src/hooks/useChangeEvent';
import { ADD_PROJECT, UPDATE_PROJECT, GET_SKILLS } from '@queries';

import {
  GetSkills,
  AddProject,
  GetProject_getProject_project as Project,
  UpdateProject,
} from '@gql-types/api';
import { addProjectMapper, updateProjectMapper } from '@src/mappers/project';
import AddProjectSection from './AddProjectSection';
import AddProjectHeader from './AddProjectHeader';

interface Props {
  project?: Project;
}

const AddProjectContainer: NextPage<Props> = auth(({ project }) => {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue } = useForm();
  const { data: skillsData } = useQuery<GetSkills>(GET_SKILLS);
  const [currentSkill, , onChangeCurrentSkill] = useChangeEvent<HTMLSelectElement>('');
  const [skills, setSkills] = useState([]);
  const [deleteSkills, setDeleteSkills] = useState([]);
  const [titleImage, setTitleImage] = useState(project?.titleImage || '');
  const [image, setImage] = useState('');

  const watchProjectType = watch('projectType');

  const [addProjectMutation] = useMutation<AddProject>(ADD_PROJECT, {
    onCompleted: async ({ addProject }) => {
      if (addProject.ok) {
        router.push('/portfolio');
      }
    },
  });
  const [updateProjectMutation] = useMutation<UpdateProject>(UPDATE_PROJECT, {
    onCompleted: async ({ updateProject }) => {
      if (updateProject.ok) {
        router.push('/portfolio');
      }
    },
  });

  useEffect(() => {
    if (project?.skills.length) {
      const saveSkills = [...project.skills];
      setSkills(saveSkills);
    }
  }, []);

  useEffect(() => {
    if (titleImage === '') {
      setTitleImage(image);
    }
  }, [image]);

  useEffect(() => {
    register({ name: 'content', defaultValue: project?.content || '', required: true });
  }, []);

  const onChangeContent = useCallback((content) => {
    setValue('content', content);
  }, []);

  const onSubmit = (values) => {
    if (project) {
      updateProjectMutation({
        variables: {
          input: updateProjectMapper(values, project.id, titleImage, deleteSkills, skills),
        },
      });
      return;
    }
    addProjectMutation({
      variables: { input: addProjectMapper(values, titleImage, skills) },
    });
  };

  const onClickAddSkill = useCallback(() => {
    if (skillsData?.getSkills.skills && currentSkill) {
      const { skills } = skillsData?.getSkills;
      const skillIndex = skills.findIndex((v) => v.id === Number(currentSkill));
      const newSkills = [...skills, { ...skills[skillIndex] }];
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
        content={project?.content || ''}
        skills={skillsData?.getSkills.skills || []}
        currentSkills={skills}
        onChangeContent={onChangeContent}
        setImage={setImage}
        onChangeCurrentSkill={onChangeCurrentSkill}
        onClickAddSkill={onClickAddSkill}
        onClickRemoveSkill={onClickRemoveSkill}
      />
    </form>
  );
});

export default AddProjectContainer;
