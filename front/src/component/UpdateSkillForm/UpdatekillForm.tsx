import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { UpdateSkillFormWrapper } from './styled';
import { getAccessToken } from '../../lib/cookie';
import { getUploadImageUrl, TYPE_FOLDER_SKILL } from '../../lib/uploadImage';
import useChangeEvent from '../../lib/useChangeEvent';
import { ADD_SKILL, UPDATE_SKILL, DELETE_SKILL } from '../../queries/skill.queries';
import { AddSkill, UpdateSkill, DeleteSkill, getSkills_GetSkills_skill } from '../../types/api';
import { reissuanceAccessToken, ERROR_EXPIRATION } from '../../lib/reissuanceAccessToken';

interface Props {
  closeUpdateSkill: () => void;
  editSkillData: getSkills_GetSkills_skill | null;
}

const UpdateSkillForm = ({ closeUpdateSkill, editSkillData }: Props) => {
  const apollo = useApolloClient();
  const [skillType, setSkillType, onChangeType] = useChangeEvent('');
  const [name, setName, onChangeName] = useChangeEvent('');
  const [level, setLevel, onChangeLevel] = useChangeEvent('');
  const [description, setDescription, onChangeDescription] = useChangeEvent('');
  const [order, setOrder, onChangeOrder] = useChangeEvent('');
  const [image, setImage] = useState('');
  const [addSkillMutation] = useMutation<AddSkill>(ADD_SKILL, {
    onCompleted: async ({ AddSkill }) => {
      if (AddSkill.error === ERROR_EXPIRATION) {
        const token = await reissuanceAccessToken(apollo);
        if (token) {
          const variables = {
            name,
            type: skillType,
            level: parseInt(level, 10),
            description,
            icon: image,
            order: parseInt(order, 10),
          };
          addSkillMutation({ variables, context: { headers: { 'X-JWT': token } } });
        }
      }
      if (AddSkill.ok) {
        closeUpdateSkill();
      }
    },
  });
  const [updateSkillMutation] = useMutation<UpdateSkill>(UPDATE_SKILL, {
    onCompleted: async ({ UpdateSkill }) => {
      if (UpdateSkill.error === ERROR_EXPIRATION) {
        const token = await reissuanceAccessToken(apollo);
        if (token) {
          const variables = {
            name,
            type: skillType,
            level: parseInt(level, 10),
            description,
            icon: image,
            order: parseInt(order, 10),
          };
          addSkillMutation({ variables, context: { headers: { 'X-JWT': token } } });
        }
      }
      if (UpdateSkill.ok) {
        closeUpdateSkill();
      }
    },
  });
  const [deleteSkillMutation] = useMutation<DeleteSkill>(DELETE_SKILL, {
    onCompleted: async ({ DeleteSkill }) => {
      if (DeleteSkill.error === ERROR_EXPIRATION) {
        const token = await reissuanceAccessToken(apollo);
        if (token) {
          const variables = {
            id: editSkillData.id,
          };
          addSkillMutation({ variables, context: { headers: { 'X-JWT': token } } });
        }
      }
      if (DeleteSkill.ok) {
        closeUpdateSkill();
      }
    },
  });

  const onClickDelete = useCallback(() => {
    deleteSkillMutation({
      variables: { id: editSkillData.id },
      context: {
        headers: {
          'X-JWT': getAccessToken(),
        },
      },
    });
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const updateMutation = editSkillData ? updateSkillMutation : addSkillMutation;
      const variables = {
        name,
        type: skillType,
        level: parseInt(level, 10),
        description,
        icon: image,
        order: parseInt(order, 10),
      };
      updateMutation({
        variables: editSkillData ? { ...variables, id: editSkillData.id } : variables,
        context: {
          headers: {
            'X-JWT': getAccessToken(),
          },
        },
      });
    },
    [name, skillType, level, description, image, order],
  );

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
