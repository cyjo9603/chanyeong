import styled from 'styled-components';

export const AboutSkillWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 74px;
    height: 74px;
  }

  & > h1 {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    font-size: 18px;
    font-weight: 700;
    margin: 6px 0;
  }

  & > span {
    width: 170px;
    text-align: center;
    font-size: 14px;
    margin-top: 8px;
  }
`;

export const LevelBar = styled.div<{ level: number }>`
  position: relative;
  width: 90px;
  height: 8px;
  background-color: ${(props) => props.theme.SKILL_GREY};
  border-radius: 4px;

  & > div {
    position: absolute;
    width: ${(props) => props.level * 9}px;
    height: 8px;
    border-radius: 4px;
    background-color: ${({ level, theme }) => {
      if (level < 4) {
        return theme.SKILL_RED;
      }
      if (level < 8) {
        return theme.SKILL_YELLOW;
      }
      return theme.SKILL_GREEN;
    }};
  }
`;
