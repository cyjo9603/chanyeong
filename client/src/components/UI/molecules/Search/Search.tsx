import React, { memo } from 'react';

import styled from 'styled-components';

import TransparentInput from '@atoms/TransparentInput';
import TransparentButton from '@atoms/TransparentButton';
import SearchIcon from '@svg-icons/SearchIcon';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent) => void;
  value: string;
}

const MemoTransparentButton = memo(TransparentButton, () => true);

export const SearchForm = styled.form`
  display: flex;
  border: 1px solid ${({ theme }) => theme.CARD_BORDER};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.CARD_BORDER};

  & > input {
    margin: 1px 0 1px 8px;
  }

  & > button {
    width: 32px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > svg {
      width: 14px;
    }
  }
`;

const Search = ({ onChange, onSearch, value }: Props) => (
  <SearchForm onSubmit={onSearch}>
    <TransparentInput type="text" onChange={onChange} value={value} />
    <MemoTransparentButton type="submit">
      <SearchIcon />
    </MemoTransparentButton>
  </SearchForm>
);

export default Search;
