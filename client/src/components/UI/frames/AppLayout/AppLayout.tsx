import React from 'react';

import Header from '@organisms/Header';
import Footer from '@organisms/Footer';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const StyledAppLayout = styled.div`
  min-height: calc(100% - 140px);
  position: relative;
  padding-bottom: 140px;
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
  transition: background 0.3s;
`;

const AppLayout = ({ children }: Props) => (
  <StyledAppLayout>
    <Header />
    {children}
    <Footer />
  </StyledAppLayout>
);

export default AppLayout;
