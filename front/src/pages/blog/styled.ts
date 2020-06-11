import styled from 'styled-components';

export const BlogWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

export const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin-top: 32px;
`;

export const BlogContainer = styled.section`
  width: 75%;

  & > section {
    margin-top: 20px;
  }

  & > section > div {
    margin-bottom: 40px;
  }
`;

export const SideTagContainer = styled.aside`
  width: 22%;
`;

export const SubItem = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const NavItem = styled(SubItem)<{ currrentFocus: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.currrentFocus ? props.theme.PRIMARY_COLOR : props.theme.LIGHT_BACKGROUND_GREY)};
`;

export const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;

  & > div > span {
    margin-right: 30px;
  }
`;
