import React from 'react';

import { PageIndexDotsWrapper, Dot } from './styled';

interface Props {
  current: number;
  onMovePage: (pageIndex: number) => void;
}

const PageIndexDots = ({ current, onMovePage }: Props) => (
  <PageIndexDotsWrapper>
    <Dot current={current === 0} onClick={() => onMovePage(0)} />
    <Dot current={current === 1} onClick={() => onMovePage(1)} />
    <Dot current={current === 2} onClick={() => onMovePage(2)} />
    <Dot current={current === 3} onClick={() => onMovePage(3)} />
  </PageIndexDotsWrapper>
);

export default PageIndexDots;
