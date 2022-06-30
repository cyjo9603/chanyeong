import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import RightArrowIcon from '@svg-icons/RightArrowIcon';

interface Props {
  title: string;
  link: string;
}

const StyledDetailButton = styled.div`
  display: flex;
  justify-content: flex-end;

  & .detail-button {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    & > svg {
      position: relative;
      top: 2px;
      left: 6px;
      height: 1em;
      fill: currentColor;
      transition: transform 0.4s;
    }

    &:hover > svg {
      transform: translateX(100%);
    }
  }
`;

const DetailButton = ({ title, link }: Props) => (
  <StyledDetailButton>
    <Link href={link} prefetch={false}>
      <a>
        <span className="detail-button">
          더 많은 {title} 보러가기
          <RightArrowIcon />
        </span>
      </a>
    </Link>
  </StyledDetailButton>
);

export default DetailButton;
