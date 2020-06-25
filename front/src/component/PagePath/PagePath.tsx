import React, { memo } from 'react';
import Link from 'next/link';

import { PagePathWrapper, LastItem } from './styled';

interface Props {
  data: {
    path: string;
    name: string;
  }[];
}

const PagePath = ({ data }: Props) => (
  <PagePathWrapper>
    {data.map((v, i) => (
      <>
        <Link href={v.path} key={`page_breadcrumb_${v.name}`}>
          <a>{i === data.length - 1 ? <LastItem>{v.name}</LastItem> : <span>{v.name}</span>}</a>
        </Link>
        {i !== data.length - 1 && <span>&gt;</span>}
      </>
    ))}
  </PagePathWrapper>
);

export default memo(PagePath);
