import styled from 'styled-components';

export const PagePathWrapper = styled.div`
  margin-bottom: 30px;

  & span {
    margin-right: 8px;
    font-weight: 500;
    font-size: 12px;
    color: ${({ theme }) => theme.LIGHT_BACKGROUND_GREY};
  }
`;

export const LastItem = styled.span`
  color: ${({ theme }) => theme.PRIMARY_FONT} !important;
`;
