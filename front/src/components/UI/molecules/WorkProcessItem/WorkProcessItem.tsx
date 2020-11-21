import React from 'react';

import styled from '@theme/styled';

interface Props {
  engName: string;
  korName: string;
}

export const StyledWorkProcessItem = styled.div`
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

const WorkProcessItem = ({ engName, korName }: Props) => (
  <StyledWorkProcessItem>
    <img src={`/${engName}.svg`} alt={engName} />
    <span>{korName}</span>
  </StyledWorkProcessItem>
);

export default WorkProcessItem;
