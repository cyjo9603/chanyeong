import React from 'react';
import styled from 'styled-components';

interface ParahraphProps {
  children: React.ReactChildren[];
}

const Paragraph = styled.p`
  font-size: 1em;
  line-height: 2;
  margin: 18px 0;
`;

const paragraph = ({ children }: ParahraphProps) => <Paragraph>{children}</Paragraph>;

export default paragraph;
