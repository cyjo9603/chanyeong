import React from 'react';

import styled from '@theme/styled';

import TransparentInput from '@atoms/TransparentInput';
import TransparentButton from '@atoms/TransparentButton';
import SearchIcon from '@svg-icons/SearchIcon';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent) => void;
  value: string;
}

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
    <TransparentButton type="submit">
      <SearchIcon />
    </TransparentButton>
  </SearchForm>
);

export default Search;
