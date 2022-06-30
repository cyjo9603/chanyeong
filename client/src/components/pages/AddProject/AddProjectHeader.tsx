import React, { FC } from 'react';

import styled from 'styled-components';
import RowFrame from '@frames/RowFrame';
import { GetProject_getProject_project as Project } from '@gql-types/api';

interface Props {
  project?: Project;
  projectType: string;
  register: any;
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

const AddProjectHeader: FC<Props> = ({ project, projectType, register }) => (
  <RowFrame>
    <StyledAddProjectHeader>
      <div className="project-input">
        <span>프로젝트 명 : </span>
        <input
          type="text"
          readOnly={Boolean(project)}
          name="title"
          ref={register({ required: true })}
          defaultValue={project?.title || ''}
        />
      </div>
      <div className="project-input">
        <span>프로젝트 타입 : </span>
        <select
          disabled={Boolean(project)}
          name="projectType"
          ref={register}
          defaultValue={project?.type || 'PERSONAL'}
        >
          <option value="PERSONAL">개인 프로젝트</option>
          <option value="GROUP">그룹 프로젝트</option>
        </select>
      </div>
      {projectType === 'GROUP' && (
        <>
          <div className="project-input">
            <span>그룹이름 : </span>
            <input
              type="text"
              name="groupName"
              ref={register}
              defaultValue={project?.groupName || ''}
            />
          </div>
          <div className="project-input">
            <span>기여도 : </span>
            <input
              type="text"
              name="contribution"
              ref={register}
              defaultValue={project?.contribution || ''}
            />
          </div>
        </>
      )}
      <div className="project-input">
        <span>프로젝트 설명 : </span>
        <input
          type="text"
          name="description"
          ref={register({ required: true })}
          defaultValue={project?.description || ''}
        />
      </div>
      <div className="project-input">
        <span>깃허브 주소 : </span>
        <input
          type="text"
          name="githubAddr"
          ref={register}
          defaultValue={project?.githubAddr || ''}
        />
      </div>
      <div className="project-input">
        <span>프로젝트 시작 날짜 : </span>
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          readOnly={Boolean(project)}
          name="startDate"
          ref={register({ required: true })}
          defaultValue={project?.startDate || ''}
        />
      </div>
      <div className="project-input">
        <span>프로젝트 종료 날짜 : </span>
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          name="endDate"
          ref={register}
          defaultValue={project?.endDate || ''}
        />
      </div>
    </StyledAddProjectHeader>
  </RowFrame>
);

export default AddProjectHeader;
