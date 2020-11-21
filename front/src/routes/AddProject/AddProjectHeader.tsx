import React, { FC } from 'react';

import styled from '@theme/styled';
import RowFrame from '@frames/RowFrame';
import { getProject_GetProject_project } from '@gql-types/api';

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
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeProjectType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeGroupName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContribution: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGithubAddr: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStartDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEndDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledAddProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 14px 0;
  color: ${({ theme }) => theme.PRIMARY_FONT};

  & .project-input {
    width: 48%;
    & input,
    select {
      border: 1px solid ${(props) => props.theme.BORDER_LINE_DARK_GREY};
      width: 100%;

      &:focus {
        outline: none;
      }
    }
  }
`;

const AddProjectHeader: FC<Props> = ({
  title,
  project,
  projectType,
  groupName,
  contribution,
  description,
  githubAddr,
  startDate,
  endDate,
  onChangeTitle,
  onChangeProjectType,
  onChangeGroupName,
  onChangeContribution,
  onChangeDescription,
  onChangeGithubAddr,
  onChangeStartDate,
  onChangeEndDate,
}) => (
  <RowFrame>
    <StyledAddProjectHeader>
      <div className="project-input">
        <span>프로젝트 명 : </span>
        <input
          type="text"
          onChange={onChangeTitle}
          value={title}
          readOnly={Boolean(project)}
        />
      </div>
      <div className="project-input">
        <span>프로젝트 타입 : </span>
        <select
          onChange={onChangeProjectType}
          disabled={Boolean(project)}
          value={projectType}
        >
          <option value="PERSONAL">개인 프로젝트</option>
          <option value="GROUP">그룹 프로젝트</option>
        </select>
      </div>
      {projectType === 'GROUP' && (
        <>
          <div className="project-input">
            <span>그룹이름 : </span>
            <input type="text" onChange={onChangeGroupName} value={groupName} />
          </div>
          <div className="project-input">
            <span>기여도 : </span>
            <input
              type="text"
              onChange={onChangeContribution}
              value={contribution}
            />
          </div>
        </>
      )}
      <div className="project-input">
        <span>프로젝트 설명 : </span>
        <input type="text" onChange={onChangeDescription} value={description} />
      </div>
      <div className="project-input">
        <span>깃허브 주소 : </span>
        <input type="text" onChange={onChangeGithubAddr} value={githubAddr} />
      </div>
      <div className="project-input">
        <span>프로젝트 시작 날짜 : </span>
        <input
          type="text"
          onChange={onChangeStartDate}
          placeholder="YYYY-MM-DD"
          value={startDate}
          readOnly={Boolean(project)}
        />
      </div>
      <div className="project-input">
        <span>프로젝트 종료 날짜 : </span>
        <input
          type="text"
          onChange={onChangeEndDate}
          placeholder="YYYY-MM-DD"
          value={endDate}
        />
      </div>
    </StyledAddProjectHeader>
  </RowFrame>
);

export default AddProjectHeader;
