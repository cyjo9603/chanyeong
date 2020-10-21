import React from 'react';
import styled from 'styled-components';

interface BlockQuoteProps {
  children: React.ReactChildren[];
}

const blockquote = ({ children }: BlockQuoteProps) => {
  return <BlockQuote>{children}</BlockQuote>;
};

const BlockQuote = styled.blockquote`
  border-left: 4px solid #20c997;
  padding: 0 16px;

  & > p {
    font-size: 18px;
    margin: 0;
  }
`;

export default blockquote;
