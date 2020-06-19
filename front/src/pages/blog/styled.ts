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

  & > section > a > div {
    margin-bottom: 40px;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 82%;
  }
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 100%;
  }
`;

export const SideTagContainer = styled.aside`
  width: 22%;

  & > section {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > div {
      background-color: ${({ theme }) => theme.TAG_BACKGROUND};
      height: 20px;
      border-radius: 8px;
      padding: 0 8px;
      margin-top: 4px;
      cursor: pointer;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 16%;
  }
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: none;
  }
`;

export const SubItem = styled.span`
  font-size: 16px;
  font-weight: 800;
`;

export const NavItem = styled(SubItem)<{ currrentFocus: boolean }>`
  cursor: pointer;
  color: ${({ theme, currrentFocus }) => (currrentFocus ? theme.PRIMARY_COLOR : theme.LIGHT_BACKGROUND_GREY)};
`;

export const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;

  & > div:first-child > span {
    margin-right: 30px;
  }

  & > div:last-child {
    display: flex;

    & > button {
      margin-right: 10px;
      background-color: ${({ theme }) => theme.PRIMARY_COLOR};
      color: ${({ theme }) => theme.DARK_BACKGROUND_GREY};
      border: none;
      border-radius: 2px;
      cursor: pointer;
      font-weight: 600;

      &:focus {
        outline: none;
      }
    }
    @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
      & > form {
        display: none;
      }
    }
  }
`;
