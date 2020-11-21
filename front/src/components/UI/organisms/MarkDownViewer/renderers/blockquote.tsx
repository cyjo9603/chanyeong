import React from 'react';
import styled from '@theme/styled';

interface BlockQuoteProps {
  children: React.ReactChildren[];
}

const BlockQuote = styled.blockquote`
  border-left: 4px solid #20c997;
  padding: 0 16px;

  & > p {
    font-size: 18px;
    margin: 0;
  }
`;

const blockquote = ({ children }: BlockQuoteProps) => {
  return <BlockQuote>{children}</BlockQuote>;
};

export default blockquote;
