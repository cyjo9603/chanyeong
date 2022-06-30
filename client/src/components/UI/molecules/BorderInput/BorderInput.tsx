import React, { FC } from 'react';

import styled from 'styled-components';
import TransparentInput, { InputProps } from '@atoms/TransparentInput';

const StyledBorderInput = styled.div`
  box-sizing: border-box;
  border: 1.2px solid ${(props) => props.theme.PRIMARY_COLOR};
  padding: 8px 16px;
`;

const BorderInput: FC<InputProps> = ({ type, placeholder, onChange, value }) => (
  <StyledBorderInput>
    <TransparentInput type={type} placeholder={placeholder} onChange={onChange} value={value} />
  </StyledBorderInput>
);

BorderInput.defaultProps = {
  type: 'text',
};

export default BorderInput;
