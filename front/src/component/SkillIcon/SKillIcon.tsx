import React from 'react';

import { IconWrapper } from './styled';

interface Props {
  name: string;
  icon: string;
}

const SkillIcon = ({ name, icon }: Props) => (
  <IconWrapper>
    <img src={icon} alt={name} />
  </IconWrapper>
);

export default SkillIcon;
