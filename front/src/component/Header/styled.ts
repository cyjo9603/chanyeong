import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

export const StatusBar = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;

  & span {
    font-weight: 500px;
    margin-right: 20px;
    margin-top: 4px;
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
  position: relative;
  display: flex;
  flex-flow: nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
`;

export const LogoWrapper = styled.div`
  width: 250px;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    position: absolute;
    margin: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 200px;
  }
`;

export const NavWrapper = styled.nav`
  width: 460px;

  ul {
    border: none;
  }

  li {
    border-bottom: 0px !important;
  }

  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.PRIMARY_COLOR};
    font-weight: 600;
    font-size: 18px;
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
