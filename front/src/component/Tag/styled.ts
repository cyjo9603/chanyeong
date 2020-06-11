import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const TagWrapper = styled.span`
  background-color: ${(props) => props.theme.TAG_BACKGROUND};
  border-radius: 8px;
  padding: 2px 8px;
  margin-right: 8px;
`;
