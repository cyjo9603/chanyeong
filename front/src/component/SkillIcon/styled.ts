import styled from 'styled-components';

export const IconWrapper = styled.span`
  & > img {
    width: 50px;
    -webkit-filter: grayscale(100%);
    filter: grayscale();
    transition: filter 0.5s;

    &:hover {
      -webkit-filter: grayscale(0%);
      filter: none;
    }
  }
`;
