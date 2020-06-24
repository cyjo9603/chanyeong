import styled from 'styled-components';

export const PostCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 230px;
  border: 1px solid ${(props) => props.theme.CARD_BORDER};
  transition: box-shadow 0.3s, border-color 0.3s;
  margin: 0 auto;

  & > img {
    width: 100%;
    height: 150px;
  }

  &:hover {
    box-shadow: 3px 3px 3px ${(props) => props.theme.CARD_BORDER};
  }
`;

export const NoImage = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${(props) => props.theme.LIGHT_GREY};
  text-align: center;
  line-height: 80px;
  font-weight: 800;
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80px;
  padding: 6px 12px;

  & > h1 {
    color: ${(props) => props.theme.PRIMARY_FONT};
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    width: 200px;
    height: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > h2 {
    color: ${(props) => props.theme.PRIMARY_FONT};
    font-size: 12px;
    font-weight: 400;
    height: 36px;
    margin: 0;
    overflow: hidden;
  }
`;
