import styled from 'styled-components';

export const ExperienceCardWrapper = styled.div`
  display: flex;
  margin-top: 8px;
  margin-left: 16px;
`;

export const ExperienceDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 4px;
  margin-right: 40px;
  font-size: 16px;
  font-weight: 700;
  width: 200px;
`;

export const ExperienceContent = styled.div`
  margin-bottom: 16px;
  & > h1 {
    font-size: 22px;
    font-weight: 700;
  }
`;

export const Term = styled.span`
  font-size: 12px;
  font-weight: 500;
`;
