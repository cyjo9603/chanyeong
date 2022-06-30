import React, { FC, memo } from 'react';

import styled from 'styled-components';

interface Props {
  category: string | null;
  onChangeCategory: (categoryName: string | null) => void;
}

const StyledCategoryNav = styled.nav`
  & > span {
    margin-right: 30px;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    color: ${({ theme }) => theme.LIGHT_BACKGROUND_GREY};

    &.focus {
      color: ${({ theme }) => theme.FONT_FOCUS};
    }
  }
`;

const CATEGORY_DIARY = 'DIARY';
const CATEGORY_DEV = 'DEV';

const CategoryNav: FC<Props> = ({ category, onChangeCategory }) => (
  <StyledCategoryNav>
    <span onClick={() => onChangeCategory(null)} className={category === null ? 'focus' : ''}>
      All
    </span>
    <span
      onClick={() => onChangeCategory(CATEGORY_DIARY)}
      className={category === CATEGORY_DIARY ? 'focus' : ''}
    >
      diary
    </span>
    <span
      onClick={() => onChangeCategory(CATEGORY_DEV)}
      className={category === CATEGORY_DEV ? 'focus' : ''}
    >
      dev
    </span>
  </StyledCategoryNav>
);

export default memo(CategoryNav, (prev, next) => prev.category === next.category);
