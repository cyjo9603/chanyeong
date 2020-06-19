import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.PRIMARY_COLOR};

  & > span {
    font-weight: 700;
    font-size: 18px;
  }

  & > img {
    width: 200px;
    border-radius: 100px;
    margin-bottom: 10px;
  }

  & > div span {
    font-size: 13px;
  }
`;
