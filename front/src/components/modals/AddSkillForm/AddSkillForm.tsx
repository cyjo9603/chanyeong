import React, { FC, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import styled from '@theme/styled';
import ModalLayout from '@modals/ModalLayout';
import { getUploadImageUrl, TYPE_FOLDER_SKILL } from '@lib/uploadImage';
import FullButton from '@atoms/FullButton';
import { ADD_SKILL } from '@queries/skill.queries';
import { AddSkill } from '@gql-types/api';
import { addSkillMapper } from '@mappers/skill';

interface Props {
  onClose: () => void;
}

const StyledAddSkillForm = styled.form`
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
`;

const AddSkillForm: FC<Props> = ({ onClose }) => {
  const { register, handleSubmit, getValues } = useForm();
  const [image, setImage] = useState('');

  const [addSkillMutation] = useMutation<AddSkill>(ADD_SKILL, {
    variables: addSkillMapper(getValues(), image),
    onCompleted: async ({ AddSkill }) => {
      if (AddSkill.ok) {
        onClose();
      }
    },
  });

  const onChangeImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await getUploadImageUrl(e.target.files[0], TYPE_FOLDER_SKILL);

    setImage(url);
  }, []);

  const onSubmit = () => {
    addSkillMutation();
  };

  return (
    <ModalLayout>
      <StyledAddSkillForm onSubmit={handleSubmit(onSubmit)}>
        <span onClick={onClose}>X</span>
        <h1>스킬 추가</h1>
        <div>
          <span>분야</span>
          <select ref={register({ required: true })} name="type" defaultValue="">
            <option value="">선택</option>
            <option value="FRONT_END">FRONT</option>
            <option value="BACK_END">BACK</option>
            <option value="DEV_OPS">DEVOPS</option>
          </select>
        </div>
        <div>
          <span>이름</span>
          <input type="text" ref={register({ required: true })} name="name" />
        </div>
        <div>
          <span>설명</span>
          <input type="text" ref={register({ required: true })} name="description" />
        </div>
        <div>
          <span>숙련도</span>
          <input type="number" ref={register({ required: true })} name="level" />
        </div>
        <div>
          <span>순서</span>
          <input type="number" ref={register({ required: true })} name="order" />
        </div>
        <div>
          <span>이미지</span>
          <input type="file" onChange={onChangeImageUpload} />
        </div>
        <FullButton text="추가" disabled={false} />
      </StyledAddSkillForm>
    </ModalLayout>
  );
};

export default AddSkillForm;
