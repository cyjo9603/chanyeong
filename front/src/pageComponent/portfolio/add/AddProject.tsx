import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';

import PageContainer from '../../../component/pageContainer';
import TUIEditor from '../../../component/TUIEditor';
import SkillIcon from '../../../component/SkillIcon';
import Button from '../../../component/Button';
import { getAccessToken } from '../../../lib/cookie';
import { reissuanceAccessToken, ERROR_EXPIRATION } from '../../../lib/reissuanceAccessToken';
import { InputWrapper, PageHeader, PageFooter, SkillWrapper } from './styled';
import { GET_SKILLS } from '../../../queries/skill.queries';
import { ADD_PROJECT, GET_PROJECT, UPDATE_PROJECT } from '../../../queries/project.queries';
import { getSkills, addProject, getProject_GetProject_project, updateProject } from '../../../types/api';
import { GET_LOCAL_USER } from '../../../queries/client';

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

const AddProject = ({ project }: Props) => {
  const apollo = useApolloClient();
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const { data } = useQuery<getSkills>(GET_SKILLS);
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
    if (data?.GetSkills.skill && currentSkill) {
      const { skill } = data?.GetSkills;
      const skillIndex = skill.findIndex((v) => v.id === Number(currentSkill));
      const newSkill = { ...skill[skillIndex] };
      const newSkills = [...skills, newSkill];
      setSkills(newSkills);
    }
  }, [data, skills, currentSkill]);

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
    <PageContainer>
      <PageHeader>
        <InputWrapper>
          <span>프로젝트 명 : </span>
          <input type="text" onChange={setTitle} value={title} readOnly={Boolean(project)} />
        </InputWrapper>
        <InputWrapper>
          <span>프로젝트 타입 : </span>
          <select onChange={setProjectType} disabled={Boolean(project)} value={projectType}>
            <option value="PERSONAL">개인 프로젝트</option>
            <option value="GROUP">그룹 프로젝트</option>
          </select>
        </InputWrapper>
        {projectType === 'GROUP' && (
          <>
            <InputWrapper>
              <span>그룹이름 : </span>
              <input type="text" onChange={setGroupName} value={groupName} />
            </InputWrapper>
            <InputWrapper>
              <span>기여도 : </span>
              <input type="text" onChange={setContribution} value={contribution} />
            </InputWrapper>
          </>
        )}
        <InputWrapper>
          <span>프로젝트 설명 : </span>
          <input type="text" onChange={setDescription} value={description} />
        </InputWrapper>
        <InputWrapper>
          <span>깃허브 주소 : </span>
          <input type="text" onChange={setGithubAddr} value={githubAddr} />
        </InputWrapper>
        <InputWrapper>
          <span>프로젝트 시작 날짜 : </span>
          <input
            type="text"
            onChange={setStartDate}
            placeholder="YYYY-MM-DD"
            value={startDate}
            readOnly={Boolean(project)}
          />
        </InputWrapper>
        <InputWrapper>
          <span>프로젝트 종료 날짜 : </span>
          <input type="text" onChange={setEndDate} placeholder="YYYY-MM-DD" value={endDate} />
        </InputWrapper>
      </PageHeader>
      <TUIEditor onChange={setContent} setImage={setImage} initialValue={content} />
      <PageFooter>
        <div>
          <Button onClick={onSubmit} name="작성" align="right" />
          <div>
            <span>스킬 추가</span>
            <select onChange={setCurrentSkill}>
              <option value="">선택</option>
              {data?.GetSkills?.skill.map((v) => (
                <option key={`add_project_skill_${v.id}`} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
            <Button onClick={onClickAddSkill} name="추가" />
          </div>
        </div>
        <div>
          {skills.map((v) => (
            <SkillWrapper key={`add_project_skill_icon_${v.id}`}>
              <SkillIcon icon={v.icon} name={v.name} />
              <span onClick={() => onClickRemoveSkill(v.id)}>x</span>
            </SkillWrapper>
          ))}
        </div>
      </PageFooter>
    </PageContainer>
  );
};

AddProject.getInitialProps = async (context) => {
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

export default AddProject;
