import styled from 'styled-components';

interface DotProps {
  current: boolean;
}

export const PageIndexDotsWrapper = styled.div`
  position: fixed;
  right: 24px;
  top: 50%;

  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
`;

export const Dot = styled.span<DotProps>`
  border-radius: 6px;
  display: block;
  width: 12px;
  height: 12px;
  background-color: ${({ current, theme }) => (current ? theme.PRIMARY_COLOR : theme.LIGHT_GREY)};
  ${({ current }) => current && 'transform: scale(1.3);'}
  transition: background-color 0.5s;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
    background-color: ${({ theme }) => theme.PRIMARY_COLOR};
  }
`;
