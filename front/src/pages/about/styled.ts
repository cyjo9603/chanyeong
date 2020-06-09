import styled from 'styled-components';

export const AboutWrapper = styled.section`
  padding: 20px 0;

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
  margin-top: 40px;
  font-size: 28px;
  font-weight: 700;
`;

export const SubTitle = styled.h3`
  font-size: 22px;
`;

export const AboutItemWrapper = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: space-around;
`;

export const WorkProcessWrapper = styled(AboutItemWrapper)`
  align-items: flex-end;
`;

export const WorkProcessItemWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > img {
    width: 100px;
  }

  & > span {
    margin-top: 14px;
    text-align: center;
    font-size: 22px;
    font-weight: 800;
  }
`;

export const SkillListWrapper = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 30px;
`;
