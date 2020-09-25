import React from 'react';

import Header from '@component/Header';
import Footer from '@component/Footer';
import LayOut from './styled';

interface Props {
  children: React.ReactNode;
  isDarkMode: boolean;
}

const AppLayout = ({ children, isDarkMode }: Props) => (
  <LayOut>
    <Header isDarkMode={isDarkMode} />
    {children}
    <Footer />
  </LayOut>
);

export default AppLayout;
