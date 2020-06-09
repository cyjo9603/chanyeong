import styled from 'styled-components';

export const PagePathWrapper = styled.div`
  margin-bottom: 30px;

  & span {
    margin-right: 8px;
    font-weight: 800;
    font-size: 12px;
    color: ${(props) => props.theme.LIGHT_BACKGROUND_GREY};
  }
`;

export const LastItem = styled.span`
  color: ${(props) => props.theme.PRIMARY_COLOR} !important;
`;
