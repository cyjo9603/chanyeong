import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import styled from '@theme/styled';
import ModalLayout from '@modals/ModalLayout';
import FullButton from '@atoms/FullButton';
import { getUploadImageUrl, TYPE_FOLDER_SKILL } from '@lib/uploadImage';
import { UPDATE_SKILL, DELETE_SKILL } from '@queries';
import { UpdateSkill, DeleteSkill, GetSkills_getSkills_skills as Skill } from '@gql-types/api';
import { updateSkillMapper } from '@mappers/skill';

interface Props {
  onClose: () => void;
  editSkillData: Skill;
}

const StyledUpdateSkillForm = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  padding: 80px;

  & > span {
    cursor: pointer;
    font-size: 20px;
    align-self: flex-end;
  }

  & > div {
    display: flex;
    flex-direction: column;

    & > input,
    select {
      border: none;
    }
  }

  & button {
    margin-top: 10px;
  }
`;

const UpdateSkillForm = ({ onClose, editSkillData }: Props) => {
  const { register, handleSubmit, getValues } = useForm();
  const [image, setImage] = useState(editSkillData.icon);

  const [updateSkillMutation] = useMutation<UpdateSkill>(UPDATE_SKILL, {
    variables: { input: updateSkillMapper(getValues(), image, editSkillData.id) },
    onCompleted: async ({ updateSkill }) => {
      if (updateSkill.ok) {
        onClose();
      }
    },
  });
  const [deleteSkillMutation] = useMutation<DeleteSkill>(DELETE_SKILL, {
    variables: { input: { id: editSkillData.id } },
    onCompleted: async ({ deleteSkill }) => {
      if (deleteSkill.ok) {
        onClose();
      }
    },
  });

  const onClickDelete = useCallback(() => {
    deleteSkillMutation();
  }, []);

  const onSubmit = () => {
    updateSkillMutation();
  };

  const onChangeImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await getUploadImageUrl(e.target.files[0], TYPE_FOLDER_SKILL);

    setImage(url);
  }, []);

  return (
    <ModalLayout>
      <StyledUpdateSkillForm onSubmit={handleSubmit(onSubmit)}>
        <span onClick={onClose}>X</span>
        <h1>스킬 업데이트</h1>
        <div>
          <span>분야</span>
          <select ref={register({ required: true })} name="type" defaultValue={editSkillData.type}>
            <option value="">선택</option>
            <option value="FRONT_END">FRONT</option>
            <option value="BACK_END">BACK</option>
            <option value="DEV_OPS">DEVOPS</option>
          </select>
        </div>
        <div>
          <span>이름</span>
          <input
            type="text"
            ref={register({ required: true })}
            name="name"
            defaultValue={editSkillData.name}
          />
        </div>
        <div>
          <span>설명</span>
          <input
            type="text"
            ref={register({ required: true })}
            name="description"
            defaultValue={editSkillData.description}
          />
        </div>
        <div>
          <span>숙련도</span>
          <input
            type="number"
            ref={register({ required: true })}
            name="level"
            defaultValue={editSkillData.level}
          />
        </div>
        <div>
          <span>순서</span>
          <input
            type="number"
            ref={register({ required: true })}
            name="order"
            defaultValue={editSkillData.order}
          />
        </div>
        <div>
          <span>이미지</span>
          <input type="file" onChange={onChangeImageUpload} />
        </div>
        <FullButton onClick={onClickDelete} text="제거" />
        <FullButton type="submit" text="업데이트" />
      </StyledUpdateSkillForm>
    </ModalLayout>
  );
};

export default UpdateSkillForm;
