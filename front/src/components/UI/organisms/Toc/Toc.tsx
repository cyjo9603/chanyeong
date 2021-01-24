import React from 'react';
import { useReactiveVar } from '@apollo/client';

import styled from '@theme/styled';
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
  padding-left: 10px;

  & > a {
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

const Toc = () => {
  const tocs = useReactiveVar(tocVar);
  return (
    <StyledToc>
      {tocs.map((toc, i) => (
        <a key={`${toc.slug}_${i}`} href={`#${toc.slug}`}>
          {toc.content}
        </a>
      ))}
    </StyledToc>
  );
};

export default Toc;
