import styled from 'styled-components';

export const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > h2 {
    font-size: 18px;
    font-weight: 400;
    margin-top: 12px;
    color: ${({ theme }) => theme.PRIMARY_FONT};
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.PRIMARY_FONT};
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
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
