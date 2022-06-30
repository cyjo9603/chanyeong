import React, { useCallback } from 'react';
import { useReactiveVar } from '@apollo/client';

import styled from 'styled-components';
import { tocVar } from '@store/postToc';

const StyledToc = styled.aside`
  margin-top: 18px;
  box-sizing: border-box;
  position: sticky;
  display: flex;
  flex-direction: column;
  width: 20%;
  top: 80px;
  height: fit-content;
  border-left: 4px solid ${({ theme }) => theme.LIGHT_GREY};
  padding-left: 18px;

  & > span {
    cursor: pointer;
    font-size: 12px;
    margin: 6px 0;
    color: ${({ theme }) => theme.LIGHT_GREY};
    font-weight: 700;
    transition: color 0.5s;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      color: ${({ theme }) => theme.A_LINK};
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    display: none;
  }
`;

const HEADER_HEIGHT = 50;
const STATUS_HEADER_HEIGHT = 30;
const INIT_OFFSET = 80;

const Toc = () => {
  const tocs = useReactiveVar(tocVar);

  const onClickToc = useCallback(
    (slug: string) => () => {
      const targetToc = document.getElementById(slug);
      const headerOffset =
        document.body.scrollTop > STATUS_HEADER_HEIGHT
          ? HEADER_HEIGHT
          : INIT_OFFSET - document.body.scrollTop;

      document.body.scroll({
        left: 0,
        top: targetToc.offsetTop - headerOffset,
        behavior: 'smooth',
      });
    },
    [],
  );

  return (
    <StyledToc>
      {tocs.map((toc, i) => (
        <span key={`${toc.slug}_${i}`} onClick={onClickToc(toc.slug)}>
          {toc.content}
        </span>
      ))}
    </StyledToc>
  );
};

export default Toc;
