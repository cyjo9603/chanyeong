import React, { FC } from 'react';

import styled from '@theme/styled';

interface Props {
  name: string;
  icon: string;
}

const StyledSkillIcon = styled.img`
  width: 50px;
  filter: grayscale(100%);
  transition: filter 0.5s;

  &:hover {
    filter: grayscale(0%);
  }
`;

const SkillIcon: FC<Props> = ({ name, icon }) => (
  <StyledSkillIcon src={icon} alt={name} />
);

export default SkillIcon;
