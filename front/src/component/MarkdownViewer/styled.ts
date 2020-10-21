import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

export const MarkdownWrapper = styled(ReactMarkdown)`
  color: ${({ theme }) => theme.PRIMARY_FONT};

  & td {
    border: 1px solid ${({ theme }) => theme.BORDER_LINE_GREY};
  }

  & li {
    font-size: 14px;
    line-height: 2;
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 20px 0 15px;
  }
  & img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
`;
