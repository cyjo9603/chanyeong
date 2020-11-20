import styled from '@theme/styled';

export const AboutWrapper = styled.section`
  padding-bottom: 20px 0;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.PRIMARY_FONT};
  & > span {
    font-size: 18px;
  }
`;

export const AboutItemWrapper = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    & > div {
      margin-bottom: 40px;

      & :last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const ExperienceWrapper = styled.div`
  margin: 90px 0 30px;
`;
