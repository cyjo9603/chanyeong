import styled from 'styled-components';

export const Title = styled.h2`
  color: ${({ theme }) => theme.PRIMARY_FONT};
  margin-top: 40px;
  font-size: 28px;
  font-weight: 700;
`;

export const SubTitle = styled.h3`
  color: ${({ theme }) => theme.PRIMARY_FONT};
  font-size: 22px;
`;

export const SkillListWrapper = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 30px;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    grid-template-columns: 1fr 1fr;
  }
`;
