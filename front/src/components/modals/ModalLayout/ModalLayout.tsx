import React, { FC } from 'react';

import styled from '@theme/styled';
import ClientOnlyPortal from '@modals/ClientOnlyPortal';

interface Props {
  children: React.ReactChild;
}

const StyledModalLayout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 1001;
`;

const ModalLayout: FC<Props> = ({ children }) => (
  <ClientOnlyPortal>
    <StyledModalLayout>{children}</StyledModalLayout>
  </ClientOnlyPortal>
);

export default ModalLayout;
