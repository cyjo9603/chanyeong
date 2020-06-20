import styled from 'styled-components';

export const AboutWrapper = styled.section`
  padding: 20px 0;
  color: ${({ theme }) => theme.PRIMARY_FONT};
  & > span {
    font-size: 18px;
  }
`;

export const MainTitle = styled.h1`
  margin-top: 40px;
  font-size: 30px;
  font-weight: 800;
`;

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

export const WorkProcessWrapper = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  flex-wrap: wrap;
`;

export const WorkProcessItemWrapper = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 100px;
  }

  & > span {
    margin-top: 14px;
    text-align: center;
    font-size: 22px;
    font-weight: 800;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    & > img {
      width: 60px;
    }

    & > span {
      font-size: 18px;
    }
  }
`;

export const SkillListWrapper = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 30px;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const SkillTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & button {
    margin-right: 10px;
    background-color: ${({ theme }) => theme.PRIMARY_COLOR};
    color: ${({ theme }) => theme.DARK_BACKGROUND_GREY};
    border: none;
    border-radius: 2px;
    cursor: pointer;
    font-weight: 600;

    &:focus {
      outline: none;
    }
  }
`;
