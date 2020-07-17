import styled from 'styled-components';

export const TagWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 23px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  margin-top: 4px;
  overflow: hidden;

  & > span:first-child {
    background-color: ${({ theme }) => theme.TAG_BACKGROUND};
    padding: 0 14px;
    height: 100%;
  }
  & > span:last-child {
    font-weight: 500;
    height: 100%;
    background-color: ${({ theme }) => theme.PRIMARY_COLOR};
    color: ${({ theme }) => theme.LIGHT_GREY};
    padding: 0 10px;
  }
`;
