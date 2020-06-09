import styled from 'styled-components';

export const PostCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 230px;
  border: 1px solid ${(props) => props.theme.DARK_BACKGROUND_GREY};
  transition: box-shadow 0.3s, border-color 0.3s;
  margin: 0 auto;

  & > img {
    width: 100%;
    height: 150px;
  }

  &:hover {
    box-shadow: 5px 5px 5px ${(props) => props.theme.DARK_BACKGROUND_GREY};
  }
`;

export const NoImage = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${(props) => props.theme.LIGHT_GREY};
  text-align: center;
  line-height: 80px;
  font-weight: 800;
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 16px);
  height: 68px;
  padding: 6px 12px;
  overflow: hidden;
  & > h1 {
    color: ${(props) => props.theme.PRIMARY_COLOR};
    font-size: 16px;
    font-weight: 700;
    margin: 0;
  }
  & > h2 {
    color: ${(props) => props.theme.PRIMARY_COLOR};
    font-size: 12px;
    font-weight: 400;
    margin: 0;
  }

  & > div {
    width: 190px;
    color: ${(props) => props.theme.PRIMARY_COLOR};
    display: flex;
    align-items: center;
  }
`;
