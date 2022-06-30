import React, { FC } from 'react';

import styled from 'styled-components';

const StyledFooterContent = styled.div`
  color: ${({ theme }) => theme.LIGHT_GREY};
  font-size: 12px;
  margin-bottom: 6px;

  & span {
    margin-right: 10px;
  }

  & > div:first-child {
    margin-bottom: 6px;
  }

  & span > a {
    color: ${({ theme }) => theme.LIGHT_GREY};
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & > div {
      display: flex;
      flex-direction: column;
    }
  }
`;

const FooterContent: FC = () => (
  <StyledFooterContent>
    <div>
      <span>조찬영</span>
      <span>cyjo9603@gmail.com</span>
      <span>
        <a href="https://github.com/cyjo9603" target="_blank" rel="noopener noreferrer">
          github.com/cyjo9603
        </a>
      </span>
    </div>
    <div>Copyright ⓒ 2020 Cho Chanyeong All Rights Reserved.</div>
  </StyledFooterContent>
);

export default FooterContent;
