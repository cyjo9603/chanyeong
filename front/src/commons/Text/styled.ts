import styled from 'styled-components';

import { SUB_TITLE } from './index';

interface Props {
  weight: number;
  size: number;
}

export default styled.div<Props>`
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
  color: ${({ theme }) => theme.PRIMARY_FONT};
  margin: ${({ size }) => (size !== SUB_TITLE ? '16px 0 4px' : '0')};
`;
