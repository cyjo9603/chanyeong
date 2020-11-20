import styled from '@theme/styled';

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 14px 0;
  color: ${({ theme }) => theme.PRIMARY_FONT};
`;

export const PageFooter = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.PRIMARY_FONT};

  & > div:first-child {
    margin-bottom: 20px;
  }

  & > div:last-child > span {
    margin-left: 8px;
  }
`;

export const InputWrapper = styled.div`
  width: 48%;
  & input,
  select {
    border: 1px solid ${(props) => props.theme.BORDER_LINE_DARK_GREY};
    width: 100%;

    &:focus {
      outline: none;
    }
  }
`;

export const SkillWrapper = styled.span`
  position: relative;

  & > span:last-child {
    position: absolute;
    right: 6px;
    cursor: pointer;
    font-weight: 600;
  }

  &:hover > span > img {
    -webkit-filter: grayscale(0%);
    filter: none;
  }
`;
