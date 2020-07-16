import React from 'react';

import { WorkProcessItemWrapper } from './styled';

interface Props {
  engName: string;
  korName: string;
}

const WorkProcessItem = ({ engName, korName }: Props) => (
  <WorkProcessItemWrapper>
    <img src={`/${engName}.svg`} alt={engName} />
    <span>{korName}</span>
  </WorkProcessItemWrapper>
);

export default WorkProcessItem;
