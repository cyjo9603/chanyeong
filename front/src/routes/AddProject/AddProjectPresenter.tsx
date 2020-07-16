import React from 'react';

import PageContainer from '../../component/pageContainer';
import TUIEditor from '../../component/TUIEditor';
import SkillIcon from '../../component/SkillIcon';
import Button from '../../component/Button';
import { InputWrapper, PageHeader, PageFooter, SkillWrapper } from './styled';
import { getSkills_GetSkills_skill, getProject_GetProject_project } from '../../types/api';

interface Props {
  title: string;
  project?: getProject_GetProject_project;
  projectType: string;
  groupName: string;
  contribution: string;
  description: string;
  githubAddr: string;
  startDate: string;
  endDate: string;
  content: string;
  skills: getSkills_GetSkills_skill[];
  currentSkills: getSkills_GetSkills_skill[];
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeProjectType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeGroupName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContribution: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGithubAddr: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStartDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEndDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  onChangeCurrentSkill: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickAddSkill: () => void;
  onClickRemoveSkill: (id: number) => void;
}

const AddProjectPresenter = ({
  title,
  project,
  projectType,
  groupName,
  contribution,
  description,
  githubAddr,
  startDate,
  endDate,
  content,
  skills,
  currentSkills,
  onChangeTitle,
  onChangeProjectType,
  onChangeGroupName,
  onChangeContribution,
  onChangeDescription,
  onChangeGithubAddr,
  onChangeStartDate,
  onChangeEndDate,
  onChangeContent,
  setImage,
  onSubmit,
  onChangeCurrentSkill,
  onClickAddSkill,
  onClickRemoveSkill,
}: Props) => (
  <PageContainer>
    <PageHeader>
      <InputWrapper>
        <span>프로젝트 명 : </span>
        <input type="text" onChange={onChangeTitle} value={title} readOnly={Boolean(project)} />
      </InputWrapper>
      <InputWrapper>
        <span>프로젝트 타입 : </span>
        <select onChange={onChangeProjectType} disabled={Boolean(project)} value={projectType}>
          <option value="PERSONAL">개인 프로젝트</option>
          <option value="GROUP">그룹 프로젝트</option>
        </select>
      </InputWrapper>
      {projectType === 'GROUP' && (
        <>
          <InputWrapper>
            <span>그룹이름 : </span>
            <input type="text" onChange={onChangeGroupName} value={groupName} />
          </InputWrapper>
          <InputWrapper>
            <span>기여도 : </span>
            <input type="text" onChange={onChangeContribution} value={contribution} />
          </InputWrapper>
        </>
      )}
      <InputWrapper>
        <span>프로젝트 설명 : </span>
        <input type="text" onChange={onChangeDescription} value={description} />
      </InputWrapper>
      <InputWrapper>
        <span>깃허브 주소 : </span>
        <input type="text" onChange={onChangeGithubAddr} value={githubAddr} />
      </InputWrapper>
      <InputWrapper>
        <span>프로젝트 시작 날짜 : </span>
        <input
          type="text"
          onChange={onChangeStartDate}
          placeholder="YYYY-MM-DD"
          value={startDate}
          readOnly={Boolean(project)}
        />
      </InputWrapper>
      <InputWrapper>
        <span>프로젝트 종료 날짜 : </span>
        <input type="text" onChange={onChangeEndDate} placeholder="YYYY-MM-DD" value={endDate} />
      </InputWrapper>
    </PageHeader>
    <TUIEditor onChange={onChangeContent} setImage={setImage} initialValue={content} />
    <PageFooter>
      <div>
        <Button onClick={onSubmit} name="작성" align="right" />
        <div>
          <span>스킬 추가</span>
          <select onChange={onChangeCurrentSkill}>
            <option value="">선택</option>
            {skills.map((v) => (
              <option key={`add_project_skill_${v.id}`} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          <Button onClick={onClickAddSkill} name="추가" />
        </div>
      </div>
      <div>
        {currentSkills.map((v) => (
          <SkillWrapper key={`add_project_skill_icon_${v.id}`}>
            <SkillIcon icon={v.icon} name={v.name} />
            <span onClick={() => onClickRemoveSkill(v.id)}>x</span>
          </SkillWrapper>
        ))}
      </div>
    </PageFooter>
  </PageContainer>
);

export default AddProjectPresenter;
