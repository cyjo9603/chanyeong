import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.BORDER_LINE_GREY};
`;

export const StatusBar = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;

  & span,
  a {
    font-weight: 500px;
    margin-right: 20px;
    margin-top: 4px;
    color: ${({ theme }) => theme.PRIMARY_FONT};
  }

  & a {
    @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
      margin-right: 20px;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    display: none;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  transition: height 0.5s;

  &.sticky-header {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 8px;
    padding-left: calc(50% - 600px);
    padding-right: calc(50% - 608px);
    width: 1200px;
    background-color: ${({ theme }) => theme.BACKGROUND_COLOR_RGBA};
    backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LINE_GREY};
    height: 50px;

    & > div {
      width: 180px;
    }

    @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
      width: calc(100% - 32px);
      padding: 0 16px;
    }

    @media (max-width: ${({ theme }) => theme.BP.PC}) {
      & > nav {
        width: 60px;
      }
    }
    @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
      & > div:first-child {
        width: 150px;

        & img {
          width: 100%;
        }
      }
    }
  }
`;

export const LogoWrapper = styled.div`
  width: 250px;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 200px;
  }
`;

export const NavWrapper = styled.nav`
  & > nav > svg {
    height: 100%;
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    position: absolute;
    width: 60px;
    right: 0;
  }
`;

export const LogoutWrapper = styled.span`
  cursor: pointer;
`;
