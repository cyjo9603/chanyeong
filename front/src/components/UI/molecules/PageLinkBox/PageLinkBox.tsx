import React, { FC } from 'react';
import Link from 'next/link';

import styled from '@theme/styled';

export const StyledPageLinkBox = styled.li`
  text-align: center;
  margin-right: 22px;

  & > a {
    color: ${({ theme }) => theme.PRIMARY_FONT} !important;
    display: block;
    text-decoration: none;
    color: ${({ theme }) => theme.PRIMARY_COLOR};
    font-size: 14px;
    font-weight: 500;
    padding: 10px 0;
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    display: none;
  }
`;

interface Props {
  onClick: () => void;
  link: string;
  text: string;
}

const PageLinkBox: FC<Props> = ({ onClick, link, text }) => {
  return (
    <StyledPageLinkBox onClick={onClick}>
      <Link href={link}>
        <a>{text}</a>
      </Link>
    </StyledPageLinkBox>
  );
};

export default PageLinkBox;
