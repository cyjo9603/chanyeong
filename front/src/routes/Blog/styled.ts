import { memo } from 'react';
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

export const SideTagContainer = memo(styled.aside`
  width: 17%;

  & > section {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 16%;
  }
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: none;
  }
`);

export const SubItem = memo(styled.span`
  color: ${({ theme }) => theme.PRIMARY_FONT};
  font-size: 16px;
  font-weight: 800;
`);

export const NavItem = styled(SubItem)<{ currrentFocus: boolean }>`
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
