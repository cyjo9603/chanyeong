import React, { FC } from 'react';
import Link from 'next/link';

import RowFrame from '@frames/RowFrame';
import styled from '@theme/styled';

interface Props {
  userName?: string;
  hidden: boolean;
  onClickLogout: () => void;
}

interface StyledProps {
  hidden: boolean;
}

const StatusBar = styled.div<StyledProps>`
  position: relative;
  z-index: 1;
  transition: background 0.3s;
  ${({ hidden, theme }) =>
    hidden && ` background-color: ${theme.BACKGROUND_COLOR_RGBA};`}

  & > div {
    height: 30px;
    display: flex;
    justify-content: flex-end;

    & span,
    a {
      font-weight: 700;
      margin-right: 20px;
      margin-top: 4px;
      color: ${({ theme }) => theme.PRIMARY_FONT};
    }

    & a {
      @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
        margin-right: 20px;
      }
    }

    @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
      display: none;
    }
  }

  & .cursor-pointer {
    cursor: pointer;
  }
`;

const UserStatusNavePresenter: FC<Props> = ({
  userName,
  hidden,
  onClickLogout,
}) => (
  <StatusBar hidden={hidden}>
    <RowFrame>
      {userName ? (
        <>
          <span>{userName}님</span>
          <span className="cursor-pointer" onClick={onClickLogout}>
            로그아웃
          </span>
        </>
      ) : (
        <span>
          <Link href="/signin">
            <a>로그인</a>
          </Link>
        </span>
      )}
    </RowFrame>
  </StatusBar>
);

export default UserStatusNavePresenter;
