import React from 'react';
import styled from 'styled-components';

interface InlineCodeProps {
  value: string;
}

const InlineCode = styled.code`
  background-color: ${({ theme }) => theme.CODE_BACKGROUND};
  color: ${({ theme }) => theme.CODE_INLINE};
  padding: 2px 4px;
  border-radius: 4px;
`;

const inlineCode = ({ value }: InlineCodeProps) => <InlineCode>{value}</InlineCode>;

export default inlineCode;
