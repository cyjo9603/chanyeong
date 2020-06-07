import React from 'react';
import { Button } from 'antd';
import { BulbFilled } from '@ant-design/icons';

import { DarkModeWrapper } from './styled';

interface Props {
  onClickDarkMode: () => void;
  isDarkMode: boolean;
}

const DarkMode = ({ onClickDarkMode, isDarkMode }: Props) => (
  <DarkModeWrapper>
    <Button
      shape="round"
      size="large"
      icon={<BulbFilled />}
      onClick={onClickDarkMode}
      type={isDarkMode ? 'primary' : 'default'}
    >
      {isDarkMode ? '라이트모드' : '다크모드'}
    </Button>
  </DarkModeWrapper>
);

export default DarkMode;
