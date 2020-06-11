import React from 'react';

import { TagWrapper } from './styled';

interface Props {
  name: string;
}

const Tag = ({ name }: Props) => <TagWrapper>{name}</TagWrapper>;

export default Tag;
