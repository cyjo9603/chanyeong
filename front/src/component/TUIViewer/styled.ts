import styled from 'styled-components';

export const ViewerWrapper = styled.section`
  & .tui-editor-contents {
    & p,
    :link,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    li,
    td {
      color: ${({ theme }) => theme.PRIMARY_FONT};
    }

    & blockquote {
      border-left: 4px solid #20c997;

      & > p {
        font-size: 18px;
      }
    }

    & td {
      border: 1px solid ${({ theme }) => theme.BORDER_LINE_GREY};
    }

    & p,
    li,
    pre {
      font-size: 14px;
      line-height: 2;
    }

    & p,
    pre {
      margin: 0 0 25px 0;
    }

    & h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 20px 0 15px;
    }

    & h1 {
      font-size: 32px;
      border-bottom: 3px solid ${({ theme }) => theme.PRIMARY_FONT};
    }
    & h2 {
      font-size: 24px;
    }
    & h3 {
      font-size: 22px;
    }
    & h4 {
      font-size: 20px;
    }
    & h5 {
      font-size: 18px;
    }
    & h6 {
      font-size: 16px;
    }
  }
`;
