import styled from '@theme/styled';

export const SearchPageWrapper = styled.section`
  margin: 0 auto;
  margin-top: 20px;
  width: 900px;

  & > header > h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.PRIMARY_FONT};
    margin-bottom: 20px;
  }

  & > a > div {
    margin-bottom: 40px;
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    width: 700px;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
  }
`;

export const NoPost = styled.div`
  color: ${({ theme }) => theme.PRIMARY_FONT};
  text-align: center;
`;
