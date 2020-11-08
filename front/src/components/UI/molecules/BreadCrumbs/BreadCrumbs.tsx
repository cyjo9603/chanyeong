import React from 'react';
import Link from 'next/link';

import styled from '@theme/styled';

interface Props {
  data: {
    path?: string;
    name: string;
  }[];
  page: string;
}

const StyledBreadCurmbs = styled.div`
  margin-bottom: 30px;

  & span {
    margin-right: 8px;
    font-weight: 500;
    font-size: 12px;
    color: ${({ theme }) => theme.LIGHT_BACKGROUND_GREY};

    &.last-item {
      color: ${({ theme }) => theme.PRIMARY_FONT};
    }
  }
`;

const BreadCrumbs = ({ data, page }: Props) => (
  <StyledBreadCurmbs>
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
          <span className="last-item">{v.name}</span>
        )}
      </span>
    ))}
  </StyledBreadCurmbs>
);

export default BreadCrumbs;
