import styled from 'styled-components';

export const DarkModeWrapper = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 1000;
  cursor: pointer;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.CARD_BORDER};
    border-radius: 40px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.CHANGE_PRIMARY};
    color: ${({ theme }) => theme.LIGHT_GREY};
    font-weight: 500;
    font-size: 16px;
    transition: width 0.5s;

    & > span {
      opacity: 0;
      transition-property: opacity;
      transition-delay: 0.5s;
      width: 0;
      white-space: nowrap;
      overflow: hidden;
    }

    & > img {
      -webkit-filter: grayscale(100%);
      filter: gray;
    }

    &:hover {
      width: 140px;

      & > img {
        -webkit-filter: grayscale(0%);
        filter: none;
        margin-right: 8px;
      }

      & > span {
        opacity: 1;
        width: fit-content;
      }
    }
  }
`;

export const LightImg = styled.img`
  width: 22px;
`;
export const DarkImg = styled.img`
  width: 18px;
`;
