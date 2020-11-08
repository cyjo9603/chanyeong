import styled from '@theme/styled';

export default styled.div`
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    width: 100%;
    padding: 0 16px;
  }
`;
