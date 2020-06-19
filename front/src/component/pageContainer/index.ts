import styled from 'styled-components';

export default styled.div`
  width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    width: 100%;
    padding: 0 16px;
  }
`;
