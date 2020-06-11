import styled from 'styled-components';

export const BlogPostCardWrapper = styled.div`
  width: 100%;
  height: 190px;
  display: flex;
  border: 1px solid ${(props) => props.theme.DARK_BACKGROUND_GREY};
  transition: box-shadow 0.3s, border-color 0.3s;

  & > div {
    width: calc(100% - 250px);
    padding: 12px 18px;
  }

  & > img {
    width: 250px;
  }

  &:hover {
    box-shadow: 5px 5px 5px ${(props) => props.theme.DARK_BACKGROUND_GREY};
  }
`;

export const Type = styled.span`
  font-size: 12px;
  font-weight: 700;
`;

export const TitleWrapper = styled.div`
  margin: 4px 0;

  & > span:first-child {
    font-size: 18px;
    font-weight: 700;
  }

  & > span:last-child {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700;
  }
`;

export const ContentWrapper = styled.div`
  font-weight: 12px;
  height: 80px;
  overflow: hidden;
`;

export const TagListWrapper = styled.div`
  margin-top: 6px;
`;
