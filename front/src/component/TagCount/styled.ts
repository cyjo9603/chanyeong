import styled from 'styled-components';

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.TAG_BACKGROUND};
  height: 23px;
  border-radius: 8px;
  padding: 1px 8px;
  margin-top: 4px;
  cursor: pointer;

  & > span:last-child {
    margin-left: 4px;
    background-color: ${({ theme }) => theme.DARK_GREY};
    color: ${({ theme }) => theme.DARK_BACKGROUND_GREY};
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 12px;
    border-radius: 10px;
    text-align: center;
  }
`;
