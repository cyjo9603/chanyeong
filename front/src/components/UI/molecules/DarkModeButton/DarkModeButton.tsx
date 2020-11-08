import React, { FC } from 'react';

import styled from '@theme/styled';
import SunIcon from '@svg-icons/SunIcon';
import MoonIcon from '@svg-icons/MoonIcon';

const LIGHT_IMG_SIZE = 22;
const DARK_IMG_SIZE = 18;

interface Props {
  onClick: () => void;
  isDarkMode: boolean;
}

interface StyledProps {
  iconSize: typeof LIGHT_IMG_SIZE | typeof DARK_IMG_SIZE;
}

const StyledDarkModeButton = styled.div<StyledProps>`
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 1000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.CARD_BORDER};
  border-radius: 40px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.CHANGE_PRIMARY};
  color: ${({ theme }) => theme.LIGHT_GREY};
  font-weight: 500;
  font-size: 16px;
  transition: width 0.5s;

  & > span {
    opacity: 0;
    transition-property: opacity;
    transition-delay: 0.5s;
    width: 0;
    white-space: nowrap;
    overflow: hidden;
  }

  &:hover {
    width: 140px;

    & > svg {
      filter: grayscale(0%);
      margin-right: 8px;
    }

    & > span {
      opacity: 1;
      width: fit-content;
    }
  }

  & > svg {
    width: ${({ iconSize }) => iconSize}px;
    filter: grayscale(100%);
  }
`;

const DarkMode: FC<Props> = ({ onClick, isDarkMode }) => (
  <StyledDarkModeButton
    iconSize={isDarkMode ? DARK_IMG_SIZE : LIGHT_IMG_SIZE}
    onClick={onClick}
  >
    {isDarkMode ? <SunIcon /> : <MoonIcon />}
    <span>{isDarkMode ? '라이트모드' : '다크모드'}</span>
  </StyledDarkModeButton>
);

export default DarkMode;
