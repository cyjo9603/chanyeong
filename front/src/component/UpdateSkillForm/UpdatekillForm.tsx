import React, { useState, useCallback } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import axios from 'axios';

import { UpdateSkillFormWrapper } from './styled';
import { getAccessToken } from '../../lib/cookie';
import useChangeEvent from '../../lib/useChangeEvent';
import { ADD_SKILL } from '../../queries/skill.queries';
import { AddSkill } from '../../types/api';
import { reissuanceAccessToken, ERROR_EXPIRATION } from '../../lib/reissuanceAccessToken';

interface Props {
  closeUpdateSkill: () => void;
}

const UpdateSkillForm = ({ closeUpdateSkill }: Props) => {
  const apollo = useApolloClient();
  const [skillType, , onChangeType] = useChangeEvent('');
  const [name, , onChangeName] = useChangeEvent('');
  const [level, , onChangeLevel] = useChangeEvent('');
  const [description, , onChangeDescription] = useChangeEvent('');
  const [order, , onChangeOrder] = useChangeEvent('');
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

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const variables = {
        name,
        type: skillType,
        level: parseInt(level, 10),
        description,
        icon: image,
        order: parseInt(order, 10),
      };
      addSkillMutation({
        variables,
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
    const name = `${+new Date()}${e.target.files[0].name}`;
    const res = await axios.put(`${process.env.IMAGE_UPLOAD_URL}skill/${name}&overwrite=true`, e.target.files[0], {
      headers: {
        Authorization: process.env.IMAGE_UPLOAD_SECRET_KEY,
        'Content-Type': 'application/octet-stream',
      },
    });
    setImage(res.data.file.url);
  }, []);

  return (
    <UpdateSkillFormWrapper>
      <form onSubmit={onSubmit}>
        <span onClick={closeUpdateSkill}>X</span>
        <h1>스킬 추가</h1>
        <div>
          <span>분야</span>
          <select onChange={onChangeType}>
            <option value="">선택</option>
            <option value="FRONT_END">FRONT</option>
            <option value="BACK_END">BACK</option>
            <option value="DEV_OPS">DEVOPS</option>
          </select>
        </div>
        <div>
          <span>이름</span>
          <input type="text" onChange={onChangeName} />
        </div>
        <div>
          <span>설명</span>
          <input type="text" onChange={onChangeDescription} />
        </div>
        <div>
          <span>숙련도</span>
          <input type="number" onChange={onChangeLevel} />
        </div>
        <div>
          <span>순서</span>
          <input type="number" onChange={onChangeOrder} />
        </div>
        <div>
          <span>이미지</span>
          <input type="file" onChange={onChangeImageUpload} />
        </div>
        <button type="submit">추가</button>
      </form>
    </UpdateSkillFormWrapper>
  );
};

export default UpdateSkillForm;
