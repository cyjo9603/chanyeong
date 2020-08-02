import styled from 'styled-components';

export const NavBarWrapper = styled.nav`
  & svg {
    display: none;
  }

  ul {
    display: flex;
    justify-content: space-between;
  }

  li {
    text-align: center;
    margin-right: 22px;

    & > a {
      color: ${({ theme }) => theme.PRIMARY_FONT} !important;
    }
  }

  & a {
    display: block;
    text-decoration: none;
    color: ${({ theme }) => theme.PRIMARY_COLOR};
    font-size: 14px;
    font-weight: 500;
    padding: 10px 0;
  }

  .menu-hover {
    flex-direction: column;
    height: 0;

    & li {
      text-align: left;
      padding-left: 14px;
      background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
      position: relative;
      right: 76px;
      width: 110px;
      display: block;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    position: relative;
    width: 60px;
    right: 0;

    & svg {
      padding: 0 20px;
      display: block;
      width: 14px;
      cursor: pointer;
      fill: ${({ theme }) => theme.PRIMARY_FONT};
    }

    & li {
      display: none;
    }
  }
`;
