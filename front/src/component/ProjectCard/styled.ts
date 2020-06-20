import styled from 'styled-components';

export const ProjectCardWrapper = styled.div`
  display: flex;
  width: 520px;
  height: 80px;
  border: 1px solid ${({ theme }) => theme.CARD_BORDER};
  transition: box-shadow 0.3s, border-color 0.3s;

  & > img {
    width: 120px;
    height: 100%;
  }

  &:hover {
    box-shadow: 3px 3px 3px ${({ theme }) => theme.CARD_BORDER};
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 320px;
  }
`;

export const NoImage = styled.div`
  width: 120px;
  height: 100%;
  background-color: ${({ theme }) => theme.LIGHT_GREY};
  text-align: center;
  line-height: 80px;
  font-weight: 800;
`;

export const ProjectContent = styled.div`
  display: flex;
  width: 400px;

  & > div:first-child {
    width: 150px;
    margin: 4px 8px;
    & > h1 {
      color: ${({ theme }) => theme.PRIMARY_FONT};
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }
    & > h2 {
      color: ${({ theme }) => theme.PRIMARY_FONT};
      font-size: 14px;
      font-weight: 400;
      margin: 0;
    }
    & > span {
      color: ${({ theme }) => theme.PRIMARY_FONT};
      font-size: 10px;
    }
  }

  & > div:last-child {
    width: 190px;
    color: ${({ theme }) => theme.PRIMARY_FONT};
    display: flex;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 200px;

    & > div:first-child {
      width: 200px;
    }

    & > div:last-child {
      display: none;
    }
  }
`;
