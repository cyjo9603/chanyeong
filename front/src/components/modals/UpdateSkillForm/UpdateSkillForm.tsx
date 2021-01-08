// TODO: 추후 리팩터링 필요
import React, { useState, useCallback, useEffect } from 'react';
import { useReissueMutation } from '@hooks/useApollo';

import { getUploadImageUrl, TYPE_FOLDER_SKILL } from '@lib/uploadImage';
import useChangeEvent from '@src/hooks/useChangeEvent';
import { ADD_SKILL, UPDATE_SKILL, DELETE_SKILL } from '@queries/skill.queries';
import { AddSkill, UpdateSkill, DeleteSkill, getSkills_GetSkills_skill } from '@gql-types/api';

import { UpdateSkillFormWrapper } from './styled';

interface Props {
  closeUpdateSkill: () => void;
  editSkillData: getSkills_GetSkills_skill | null;
}

const UpdateSkillForm = ({ closeUpdateSkill, editSkillData }: Props) => {
  const [skillType, setSkillType, onChangeType] = useChangeEvent<HTMLSelectElement>('');
  const [name, setName, onChangeName] = useChangeEvent('');
  const [level, setLevel, onChangeLevel] = useChangeEvent('');
  const [description, setDescription, onChangeDescription] = useChangeEvent('');
  const [order, setOrder, onChangeOrder] = useChangeEvent('');
  const [image, setImage] = useState('');
  const addOrUpdateVariables = {
    name,
    type: skillType,
    level: parseInt(level, 10),
    description,
    icon: image,
    order: parseInt(order, 10),
  };
  const [addSkillMutation] = useReissueMutation<AddSkill>(ADD_SKILL, {
    variables: addOrUpdateVariables,
    onCompleted: async ({ AddSkill }) => {
      if (AddSkill.ok) {
        closeUpdateSkill();
      }
    },
  });
  const [updateSkillMutation] = useReissueMutation<UpdateSkill>(UPDATE_SKILL, {
    variables: {
      ...addOrUpdateVariables,
      id: editSkillData?.id,
    },
    onCompleted: async ({ UpdateSkill }) => {
      if (UpdateSkill.ok) {
        closeUpdateSkill();
      }
    },
  });
  const [deleteSkillMutation] = useReissueMutation<DeleteSkill>(DELETE_SKILL, {
    variables: { id: editSkillData?.id },
    onCompleted: async ({ DeleteSkill }) => {
      if (DeleteSkill.ok) {
        closeUpdateSkill();
      }
    },
  });

  const onClickDelete = useCallback(() => {
    deleteSkillMutation();
  }, []);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const updateMutation = editSkillData ? updateSkillMutation : addSkillMutation;
    updateMutation();
  }, []);

  const onChangeImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await getUploadImageUrl(e.target.files[0], TYPE_FOLDER_SKILL);

    setImage(url);
  }, []);

  useEffect(() => {
    if (editSkillData) {
      setSkillType(editSkillData.type);
      setName(editSkillData.name);
      setLevel(String(editSkillData.level));
      setDescription(editSkillData.description);
      setOrder(String(editSkillData.order));
      setImage(editSkillData.icon);
    }
  }, []);

  return (
    <UpdateSkillFormWrapper>
      <form onSubmit={onSubmit}>
        <span onClick={closeUpdateSkill}>X</span>
        <h1>스킬 업데이트</h1>
        <div>
          <span>분야</span>
          <select onChange={onChangeType}>
            <option value="" selected={skillType === ''}>
              선택
            </option>
            <option value="FRONT_END" selected={skillType === 'FRONT_END'}>
              FRONT
            </option>
            <option value="BACK_END" selected={skillType === 'BACK_END'}>
              BACK
            </option>
            <option value="DEV_OPS" selected={skillType === 'DEV_OPS'}>
              DEVOPS
            </option>
          </select>
        </div>
        <div>
          <span>이름</span>
          <input type="text" value={name} onChange={onChangeName} />
        </div>
        <div>
          <span>설명</span>
          <input type="text" value={description} onChange={onChangeDescription} />
        </div>
        <div>
          <span>숙련도</span>
          <input type="number" value={level} onChange={onChangeLevel} />
        </div>
        <div>
          <span>순서</span>
          <input type="number" value={order} onChange={onChangeOrder} />
        </div>
        <div>
          <span>이미지</span>
          <input type="file" onChange={onChangeImageUpload} />
        </div>
        {editSkillData && <button onClick={onClickDelete}>제거</button>}
        <button type="submit">업데이트</button>
      </form>
    </UpdateSkillFormWrapper>
  );
};

export default UpdateSkillForm;
