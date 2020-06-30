import React, { memo } from 'react';
import Link from 'next/link';

import { PagePathWrapper, LastItem } from './styled';

interface Props {
  data: {
    path?: string;
    name: string;
  }[];
  page: string;
}

const PagePath = ({ data, page }: Props) => (
  <PagePathWrapper>
    {data.map((v, i) => (
      <span key={`page_breadcrumb_${page}_${v.name}`}>
        {i !== data.length - 1 ? (
          <>
            <Link href={v.path}>
              <a>
                <span>{v.name}</span>
              </a>
            </Link>
            <span>&gt;</span>
          </>
        ) : (
          <LastItem>{v.name}</LastItem>
        )}
      </span>
    ))}
  </PagePathWrapper>
);

export default memo(PagePath);
