import styled from '@theme/styled';

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.PRIMARY_FONT};

  & > span {
    font-weight: 700;
    font-size: 18px;
  }

  & > img {
    width: 200px;
    border-radius: 100px;
    margin-bottom: 10px;
  }

  & > div span {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    font-size: 13px;
  }
`;
