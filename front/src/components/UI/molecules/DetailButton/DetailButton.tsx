import React from 'react';
import Link from 'next/link';

import styled from '@theme/styled';
import RightArrowIcon from '@svg-icons/RightArrowIcon';

interface Props {
  title: string;
  link: string;
}

const StyledDetailButton = styled.span`
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
`;

const DetailButton = ({ title, link }: Props) => (
  <Link href={link}>
    <a>
      <StyledDetailButton>
        더 많은 {title} 보러가기
        <RightArrowIcon />
      </StyledDetailButton>
    </a>
  </Link>
);

export default DetailButton;
