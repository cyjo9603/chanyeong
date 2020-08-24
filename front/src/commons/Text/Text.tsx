import React, { memo } from 'react';

import TextWrapper from './styled';
import { SUB_TITLE } from './index';

interface Props {
  content: string;
  weight?: number;
  size?: number;
}

const Text = ({ content, weight = 500, size = SUB_TITLE }: Props) => (
  <TextWrapper weight={weight} size={size}>
    {content}
  </TextWrapper>
);

export default memo(Text);
