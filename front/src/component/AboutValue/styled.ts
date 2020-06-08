import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 310px;

  & > h2 {
    color: ${(props) => props.theme.LIGHT_BACKGROUND_GREY};
    font-weight: 700;
    font-size: 26px;
    margin: 0;
  }

  & > div {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    text-align: center;
    background-color: ${(props) => props.theme.PRIMARY_COLOR};

    & > h1 {
      line-height: 200px;
      margin: auto;
      color: ${(props) => props.theme.DARK_BACKGROUND_GREY};
      font-weight: 800;
      font-size: 40px;
    }
  }

  & > span {
    margin-top: 20px;
    color: ${(props) => props.theme.PRIMARY_COLOR};
    font-weight: 400;
  }
`;
