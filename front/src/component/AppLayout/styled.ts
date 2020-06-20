import styled from 'styled-components';

export default styled.div`
  min-height: 100%;
  position: relative;
  padding-bottom: 140px;
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
  transition: background 0.3s;
`;
