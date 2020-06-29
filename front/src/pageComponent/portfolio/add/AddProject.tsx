import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Router from 'next/router';
import { Helmet } from 'react-helmet';
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
import { getSkills, addProject, getProject_GetProject, updateProject } from '../../../types/api';
import { GET_LOCAL_USER } from '../../../queries/client';

interface Props {
  GetProject?: getProject_GetProject;
}

const useInput = (initValue: string): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState(initValue);

  const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeInput];
};

const useSelect = (initValue: string): [string, (e: React.ChangeEvent<HTMLSelectElement>) => void] => {
  const [value, setValue] = useState(initValue);

  const onChangeSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeSelect];
};

const AddProject = ({ GetProject }: Props) => {
  const apollo = useApolloClient();
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const { data } = useQuery<getSkills>(GET_SKILLS);
  const [content, setContent] = useState(GetProject?.project.content || '');
  const [projectType, setProjectType] = useSelect(GetProject?.project.type || 'PERSONAL');
  const [currentSkill, setCurrentSkill] = useSelect('');
  const [groupName, setGroupName] = useInput(GetProject?.project.groupName || '');
  const [title, setTitle] = useInput(GetProject?.project.title || '');
  const [description, setDescription] = useInput(GetProject?.project.description || '');
  const [startDate, setStartDate] = useInput(GetProject?.project.startDate || '');
  const [endDate, setEndDate] = useInput(GetProject?.project.endDate || '');
  const [githubAddr, setGithubAddr] = useInput(GetProject?.project.githubAddr || '');
  const [contribution, setContribution] = useInput(String(GetProject?.project.contribution || ''));
  const [skills, setSkills] = useState([]);
  const [deleteSkills, setDeleteSkills] = useState([]);
  const [titleImage, setTitleImage] = useState(GetProject?.project.titleImage || '');
  const [image, setImage] = useState('');
  const [addProjectMutation] = useMutation<addProject>(ADD_PROJECT, {
    onCompleted: async ({ AddProject }) => {
      if (AddProject.error === ERROR_EXPIRATION) {
        const token = await reissuanceAccessToken(apollo);
        if (token) {
          const variables = {
            content,
            type: projectType,
            groupName,
            title,
            description,
            startDate,
            endDate: endDate || null,
            githubAddr: githubAddr || null,
            titleImage: titleImage || null,
            contribution: contribution === '' ? 0 : parseInt(contribution, 10),
            skillIds: skills.map((v) => v.id),
          };
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
          const variables = {
            id: GetProject.project.id,
            content,
            groupName,
            description,
            endDate: endDate || null,
            githubAddr,
            titleImage,
            contribution: contribution === '' ? 0 : parseInt(contribution, 10),
            deleteSkills,
            addSkills: skills.map((v) => v.id),
          };
          updateProjectMutation({ variables, context: { headers: { 'X-JWT': token } } });
        }
      }
      if (UpdateProject.ok) {
        Router.push('/portfolio');
      }
    },
  });

  useEffect(() => {
    if (GetProject?.project.Skills.length) {
      const saveSkills = [...GetProject?.project.Skills];
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
      if (GetProject) {
        const variables = {
          id: GetProject.project.id,
          content,
          groupName,
          description,
          endDate: endDate || null,
          githubAddr,
          titleImage,
          contribution: contribution === '' ? 0 : parseInt(contribution, 10),
          deleteSkills,
          addSkills: skills.map((v) => v.id),
        };
        updateProjectMutation({
          variables,
          context,
        });
      } else {
        const variables = {
          content,
          type: projectType,
          groupName,
          title,
          description,
          startDate,
          endDate: endDate || null,
          githubAddr: githubAddr || null,
          titleImage: titleImage || null,
          contribution: contribution === '' ? 0 : parseInt(contribution, 10),
          skillIds: skills.map((v) => v.id),
        };
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
    GetProject,
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
    <>
      <Helmet>
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css" />
        <link rel="stylesheet" href="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/github.min.css"
        />
      </Helmet>
      <PageContainer>
        <PageHeader>
          <InputWrapper>
            <span>프로젝트 명 : </span>
            <input type="text" onChange={setTitle} value={title} readOnly={Boolean(GetProject)} />
          </InputWrapper>
          <InputWrapper>
            <span>프로젝트 타입 : </span>
            <select onChange={setProjectType} disabled={Boolean(GetProject)}>
              <option value="PERSONAL" selected={Boolean(!GetProject || GetProject?.project.type === 'PERSONAL')}>
                개인 프로젝트
              </option>
              <option value="GROUP" selected={GetProject?.project.type === 'GROUP'}>
                그룹 프로젝트
              </option>
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
              readOnly={Boolean(GetProject)}
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
    </>
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
    return projectData.data;
  }
};

export default AddProject;
