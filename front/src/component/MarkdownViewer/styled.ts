import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

export const MarkdownWrapper = styled(ReactMarkdown)`
  color: ${({ theme }) => theme.PRIMARY_FONT};
  font-size: 16px;

  & td {
    border: 1px solid ${({ theme }) => theme.BORDER_LINE_GREY};
  }

  & li {
    font-size: 1em;
    line-height: 2;
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    margin-bottom: 16px;
  }

  h1 {
    margin-top: 40px;
    font-size: 40px;
  }
  h2 {
    margin-top: 26px;
    font-size: 32px;
  }
  h3 {
    margin-top: 24px;
    font-size: 24px;
  }
  h4 {
    margin-top: 24px;
    font-size: 18px;
  }
  h5 {
    margin-top: 24px;
    font-size: 16px;
  }
  h6 {
    margin-top: 24px;
    font-size: 14px;
  }

  & img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
`;
