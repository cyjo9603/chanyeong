import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.FOOTER_BACKGROUND};
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
  color: ${({ theme }) => theme.LIGHT_GREY};
  font-size: 12px;
  margin-bottom: 6px;

  & span {
    margin-right: 10px;
  }

  & > div:first-child {
    margin-bottom: 6px;
  }

  & span > a {
    color: ${({ theme }) => theme.LIGHT_GREY};
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & > div {
      display: flex;
      flex-direction: column;
    }
  }
`;
