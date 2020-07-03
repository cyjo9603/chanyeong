import React, { memo } from 'react';

import { DarkModeWrapper, LightImg, DarkImg } from './styled';

interface Props {
  onClickDarkMode: () => void;
  isDarkMode: boolean;
}

const DarkMode = ({ onClickDarkMode, isDarkMode }: Props) => (
  <DarkModeWrapper>
    <div onClick={onClickDarkMode}>
      {isDarkMode ? <LightImg src="/sun.svg" alt="light mode" /> : <DarkImg src="/moon.svg" alt="dark mode" />}

      <span>{isDarkMode ? '라이트모드' : '다크모드'}</span>
    </div>
  </DarkModeWrapper>
);

export default memo(DarkMode);
