import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

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
