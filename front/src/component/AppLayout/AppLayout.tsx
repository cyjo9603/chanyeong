import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

import LayOut from './styled';

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => (
  <LayOut>
    <Header />
    {children}
    <Footer />
  </LayOut>
);

export default AppLayout;
