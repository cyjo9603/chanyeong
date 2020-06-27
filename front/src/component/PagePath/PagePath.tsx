import React, { memo } from 'react';
import Link from 'next/link';

import { PagePathWrapper, LastItem } from './styled';

interface Props {
  data: {
    path: string;
    name: string;
  }[];
  page: string;
}

const PagePath = ({ data, page }: Props) => (
  <PagePathWrapper>
    {data.map((v, i) => (
      <span key={`page_breadcrumb_${page}_${v.name}`}>
        <Link href={v.path}>
          <a>{i === data.length - 1 ? <LastItem>{v.name}</LastItem> : <span>{v.name}</span>}</a>
        </Link>
        {i !== data.length - 1 && <span>&gt;</span>}
      </span>
    ))}
  </PagePathWrapper>
);

export default memo(PagePath);
