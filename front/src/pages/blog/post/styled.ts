import styled from 'styled-components';

export const PostWrapper = styled.div`
  margin-bottom: 80px;
`;

export const PostHeader = styled.div`
  margin-bottom: 20px;

  & > h1 {
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 10px;
    color: ${(props) => props.theme.PRIMARY_COLOR};
  }

  & > div {
    margin-bottom: 10px;
  }
`;
