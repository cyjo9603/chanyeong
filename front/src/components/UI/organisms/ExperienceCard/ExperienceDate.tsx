import React, { FC, useMemo } from 'react';

import styled from '@theme/styled';

interface Props {
  startDate: string;
  endDate?: string;
}

export const StyledExperienceDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 4px;
  margin-right: 40px;
  font-size: 16px;
  font-weight: 700;
  width: 200px;

  & > span.term {
    font-size: 12px;
    font-weight: 500;
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    flex-direction: row;
    align-items: center;
    width: 100%;

    & > span {
      margin-right: 8px;
    }
  }
`;

const ExperienceDate: FC<Props> = ({ endDate, startDate }) => {
  const term = useMemo(() => {
    const dateGap = +new Date(endDate || Date.now()) - +new Date(startDate);
    return Math.round(dateGap / (1000 * 60 * 60 * 24 * 30));
  }, []);

  return (
    <StyledExperienceDate>
      <span>{`${startDate} ~ ${endDate || '진행 중'}`}</span>
      <span className="term">{`${term}개월`}</span>
    </StyledExperienceDate>
  );
};

export default ExperienceDate;
