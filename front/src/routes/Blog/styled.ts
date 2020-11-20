import styled from '@theme/styled';

export const BlogWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

export const BlogContainer = styled.section`
  width: 80%;

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

export const NavItem = styled.span<{ currrentFocus: boolean }>`
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  color: ${({ theme, currrentFocus }) =>
    currrentFocus ? theme.FONT_FOCUS : theme.LIGHT_BACKGROUND_GREY};
`;

export const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;

  & > div:first-child > span {
    margin-right: 30px;
  }

  & > div:last-child {
    display: flex;

    @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
      & > form {
        display: none;
      }
    }
  }
`;
