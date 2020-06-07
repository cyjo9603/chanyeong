import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  position: absolute;
  bottom: 0;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  width: 100%;
  height: 140px;

  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const FooterLogoWrapper = styled.div`
  & > img {
    margin-top: 10px;
    width: 140px;
  }
`;

export const FooterInfoWrapper = styled.div`
  color: ${(props) => props.theme.LIGHT_GREY};
  font-size: 12px;
  margin-bottom: 6px;

  & span {
    margin-right: 10px;
  }

  & > div:first-child {
    margin-bottom: 6px;
  }
`;
