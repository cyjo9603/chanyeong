import styled from 'styled-components';

export const PostWrapper = styled.div`
  margin-bottom: 80px;
`;

export const PostHeader = styled.div`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.PRIMARY_FONT};

  & > h1 {
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.PRIMARY_FONT};

    @media (max-width: ${({ theme }) => theme.BP.PC}) {
      font-size: 34px;
    }
    @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
      font-size: 28px;
    }
    @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
      font-size: 20px;
    }
  }

  & > div {
    margin-bottom: 10px;
  }
`;
