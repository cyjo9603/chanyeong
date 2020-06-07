import React from 'react';
import Header from '../Header';

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => (
  <>
    <Header />
    {children}
  </>
);

export default AppLayout;
