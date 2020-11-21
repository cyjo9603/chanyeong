import React from 'react';

import RowFrame from '@frames/RowFrame';
import TUIEditor from '@organisms/TUIEditor';
import SkillIcon from '@atoms/SkillIcon';
import Button from '@atoms/Button';
import { getSkills_GetSkills_skill } from '@gql-types/api';
import styled from '@theme/styled';

interface Props {
  content: string;
  skills: getSkills_GetSkills_skill[];
  currentSkills: getSkills_GetSkills_skill[];

  onChangeContent: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  onChangeCurrentSkill: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickAddSkill: () => void;
  onClickRemoveSkill: (id: number) => void;
}

const StyledAddProjectSection = styled.div`
  & .add-project-skills {
    position: relative;

    & > span:last-child {
      position: absolute;
      right: 6px;
      cursor: pointer;
      font-weight: 600;
    }

    &:hover > span > img {
      -webkit-filter: grayscale(0%);
      filter: none;
    }
  }
  footer {
    margin-top: 10px;
    margin-bottom: 40px;
    color: ${({ theme }) => theme.PRIMARY_FONT};

    & > div:first-child {
      margin-bottom: 20px;
    }

    & > div:last-child > span {
      margin-left: 8px;
    }
  }
`;

const AddProjectSection = ({
  content,
  skills,
  currentSkills,

  onChangeContent,
  setImage,
  onSubmit,
  onChangeCurrentSkill,
  onClickAddSkill,
  onClickRemoveSkill,
}: Props) => (
  <RowFrame>
    <StyledAddProjectSection>
      <TUIEditor
        onChange={onChangeContent}
        setImage={setImage}
        initialValue={content}
      />
      <footer>
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
            <div
              className="add-project-skills"
              key={`add_project_skill_icon_${v.id}`}
            >
              <SkillIcon icon={v.icon} name={v.name} />
              <span onClick={() => onClickRemoveSkill(v.id)}>x</span>
            </div>
          ))}
        </div>
      </footer>
    </StyledAddProjectSection>
  </RowFrame>
);

export default AddProjectSection;
