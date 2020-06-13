import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 200px;
    border-radius: 100px;
    margin-bottom: 10px;
  }

  & > span {
    font-size: 26px;
    color: ${(props) => props.theme.PRIMARY_COLOR};
  }
`;
