import styled from 'styled-components';

export const BlogPostCardWrapper = styled.div<{ hasImage: boolean }>`
  width: 100%;
  height: 190px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.CARD_BORDER};
  transition: box-shadow 0.3s, border-color 0.3s;
  color: ${({ theme }) => theme.PRIMARY_FONT};

  & > div {
    width: calc(100% - ${({ hasImage }) => (hasImage ? 290 : 0)}px);
    padding: 12px 18px;
  }

  & > img {
    width: 290px;
  }

  &:hover {
    box-shadow: 5px 5px 5px ${({ theme }) => theme.CARD_BORDER};
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    height: 130px;
    & > div {
      width: calc(100% - ${({ hasImage }) => (hasImage ? 170 : 0)}px);
      padding: 12px 18px;
    }
    & > img {
      width: 170px;
    }
  }
`;

export const Type = styled.span`
  font-size: 12px;
  font-weight: 700;
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    font-size: 10px;
  }
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
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: flex;
    flex-direction: column-reverse;

    & > span:first-child {
      font-size: 16px;
    }
    & > span:last-child {
      display: block;
      margin-left: 0;
      font-size: 10px;
      font-weight: 500;
    }
  }
`;

export const ContentWrapper = styled.div`
  font-size: 14px;
  height: 70px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: none;
  }
`;

export const TagListWrapper = styled.div`
  margin-top: 10px;

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: none;
  }
`;

export const NewPost = styled.span`
  margin-left: 8px;
  padding: 0 4px;
  font-size: 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.NEW_COLOR};
  color: ${({ theme }) => theme.DARK_BACKGROUND_GREY};
`;
