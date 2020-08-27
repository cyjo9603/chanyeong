import styled from 'styled-components';

export const StatusBar = styled.div<{ isScrollTop: boolean }>`
  position: relative;
  z-index: 1;
  transition: background 0.3s;
  ${({ isScrollTop, theme }) =>
    !isScrollTop &&
    `
  background-color: ${theme.BACKGROUND_COLOR_RGBA};
  backdrop-filter: saturate(180%) blur(20px);
  `};
  & > div {
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
  }
`;

export const HeaderSection = styled.div<{ scrollRatio: number }>`
  position: sticky;
  top: 0;
  ${({ theme, scrollRatio }) =>
    scrollRatio !== 0 &&
    `
  background-color: ${theme.BACKGROUND_COLOR_RGBA};
  backdrop-filter: saturate(180%) blur(20px);
  `}
  border-bottom: 1px solid ${({ theme }) => theme.BORDER_LINE_GREY};
  z-index: 100;
  transition: background 0.3s;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${({ scrollRatio }) => 80 - 30 * scrollRatio}px;
  }
`;

export const LogoWrapper = styled.div<{ scrollRatio: number }>`
  width: ${({ scrollRatio }) => 250 - 70 * scrollRatio}px;

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
