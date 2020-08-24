import styled from 'styled-components';

export const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProjectListWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  grid-row-gap: 30px;

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    grid-template-columns: 1fr;
    justify-items: left;
  }
`;
