import styled from 'styled-components';

export const ProjectCardWrapper = styled.div`
  display: flex;
  width: 520px;
  height: 80px;
  border: 1px solid ${(props) => props.theme.DARK_BACKGROUND_GREY};
  transition: box-shadow 0.3s, border-color 0.3s;

  & > img {
    width: 120px;
    height: 100%;
  }

  &:hover {
    box-shadow: 5px 5px 5px ${(props) => props.theme.DARK_BACKGROUND_GREY};
  }
`;

export const NoImage = styled.div`
  width: 120px;
  height: 100%;
  background-color: ${(props) => props.theme.LIGHT_GREY};
  text-align: center;
  line-height: 80px;
  font-weight: 800;
`;

export const ProjectContent = styled.div`
  display: flex;
  width: 400px;

  & > div:first-child {
    width: 150px;
    margin: 4px 8px;
    & > h1 {
      color: ${(props) => props.theme.PRIMARY_COLOR};
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }
    & > h2 {
      color: ${(props) => props.theme.PRIMARY_COLOR};
      font-size: 14px;
      font-weight: 400;
      margin: 0;
    }
    & > span {
      color: ${(props) => props.theme.PRIMARY_COLOR};
      font-size: 10px;
    }
  }

  & > div:last-child {
    width: 190px;
    color: ${(props) => props.theme.PRIMARY_COLOR};
    display: flex;
    align-items: center;
  }
`;
