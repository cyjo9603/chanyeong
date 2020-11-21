import styled from '@theme/styled';

export const ProjectWrapper = styled.div`
  margin-bottom: 80px;
`;

export const ProjectHeader = styled.div`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.PRIMARY_FONT};

  & > div {
    margin-bottom: 10px;
  }

  & a {
    color: ${({ theme }) => theme.PRIMARY_FONT};
  }
`;
