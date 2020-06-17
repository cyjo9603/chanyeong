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
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-flow: nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
`;

export const LogoWrapper = styled.div`
  width: 250px;
`;

export const NavWrapper = styled.nav`
  width: 440px;

  ul {
    border: none;
  }

  li {
    border-bottom: 0px !important;
  }

  & a {
    text-decoration: none;
    color: ${(props) => props.theme.PRIMARY_COLOR};
    font-weight: 600;
    font-size: 18px;
  }
`;

export const LogoutWrapper = styled.span`
  cursor: pointer;
`;
