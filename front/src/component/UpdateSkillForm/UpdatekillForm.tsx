import React, { useState, useCallback } from 'react';
import { MutationHookOptions } from '@apollo/react-hooks';
import axios from 'axios';

import { UpdateSkillFormWrapper } from './styled';
import { getAccessToken } from '../../lib/cookie';

const useInput = (initValue: string): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState(initValue);

  const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeInput];
};

interface Props {
  closeUpdateSkill: () => void;
  onSubmitMutation: (options: MutationHookOptions) => Promise<any>;
}

const UpdateSkillForm = ({ closeUpdateSkill, onSubmitMutation }: Props) => {
  const [skillType, setSkillType] = useState('');
  const [name, setName] = useInput('');
  const [level, setLevel] = useInput('');
  const [description, setDescription] = useInput('');
  const [order, setOrder] = useInput('');
  const [image, setImage] = useState('');

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
      onSubmitMutation({
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

  const onChangeType = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSkillType(e.target.value);
  }, []);

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
          <input type="text" onChange={setName} />
        </div>
        <div>
          <span>설명</span>
          <input type="text" onChange={setDescription} />
        </div>
        <div>
          <span>숙련도</span>
          <input type="number" onChange={setLevel} />
        </div>
        <div>
          <span>순서</span>
          <input type="number" onChange={setOrder} />
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
