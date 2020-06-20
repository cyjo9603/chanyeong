import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from '@apollo/react-hooks';

import PageContainer from '../../../component/pageContainer';
import TUIEditor from '../../../component/TUIEditor';
import SkillIcon from '../../../component/SkillIcon';
import { getAccessToken } from '../../../lib/cookie';
import { InputWrapper, PageHeader, PageFooter } from './styled';
import { GET_SKILLS } from '../../about/aboutSKill.queries';
import { ADD_PROJECT } from './AddProject.queries';
import { getSkills, addProject } from '../../../types/api';
import { GET_LOCAL_USER } from '../../../sharedQueries.queries';

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

const AddProject = () => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const { data } = useQuery<getSkills>(GET_SKILLS);
  const [addProjectMutation] = useMutation<addProject>(ADD_PROJECT, {
    onCompleted: ({ AddProject }) => {
      if (AddProject.ok) {
        Router.push('/portfolio');
      }
    },
  });
  const [content, setContent] = useState('');
  const [projectType, setProjectType] = useSelect('PERSONAL');
  const [currentSkill, setCurrentSkill] = useSelect('');
  const [groupName, setGroupName] = useInput('');
  const [title, setTitle] = useInput('');
  const [description, setDescription] = useInput('');
  const [startDate, setStartDate] = useInput('');
  const [endDate, setEndDate] = useInput('');
  const [githubAddr, setGithubAddr] = useInput('');
  const [contribution, setContribution] = useInput('');
  const [skills, setSkills] = useState([]);
  const [titleImage, setTitleImage] = useState('');
  const [image, setImage] = useState('');

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
      const variables = {
        content,
        type: projectType,
        groupName,
        title,
        description,
        startDate,
        endDate,
        githubAddr,
        titleImage,
        contribution: contribution === '' ? 0 : parseInt(contribution, 10),
        skillIds: skills.map((v) => v.id),
      };
      addProjectMutation({
        variables,
        context: {
          headers: {
            'X-JWT': getAccessToken(),
          },
        },
      });
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

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css" />
        <link rel="stylesheet" href="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.css" />
      </Helmet>
      <PageContainer>
        <PageHeader>
          <InputWrapper>
            <span>프로젝트 명 : </span>
            <input type="text" onChange={setTitle} />
          </InputWrapper>
          <InputWrapper>
            <span>프로젝트 타입 : </span>
            <select onChange={setProjectType}>
              <option value="PERSONAL" selected>
                개인 프로젝트
              </option>
              <option value="GROUP">그룹 프로젝트</option>
            </select>
          </InputWrapper>
          {projectType === 'GROUP' && (
            <>
              <InputWrapper>
                <span>그룹이름 : </span>
                <input type="text" onChange={setGroupName} />
              </InputWrapper>
              <InputWrapper>
                <span>기여도 : </span>
                <input type="text" onChange={setContribution} />
              </InputWrapper>
            </>
          )}
          <InputWrapper>
            <span>프로젝트 설명 : </span>
            <input type="text" onChange={setDescription} />
          </InputWrapper>
          <InputWrapper>
            <span>깃허브 주소 : </span>
            <input type="text" onChange={setGithubAddr} />
          </InputWrapper>
          <InputWrapper>
            <span>프로젝트 시작 날짜 : </span>
            <input type="text" onChange={setStartDate} placeholder="YYYY-MM-DD" />
          </InputWrapper>
          <InputWrapper>
            <span>프로젝트 종료 날짜 : </span>
            <input type="text" onChange={setEndDate} placeholder="YYYY-MM-DD" />
          </InputWrapper>
        </PageHeader>
        <TUIEditor onChange={setContent} setImage={setImage} />
        <PageFooter>
          <div>
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
              <button onClick={onClickAddSkill}> 추가</button>
            </div>
            <button onClick={onSubmit}>프로젝트 추가</button>
          </div>
          <div>
            {skills.map((v) => (
              <SkillIcon key={`add_project_skill_icon_${v.id}`} icon={v.icon} name={v.name} />
            ))}
          </div>
        </PageFooter>
      </PageContainer>
    </>
  );
};

export default AddProject;
