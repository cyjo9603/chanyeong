import React from 'react';

import { SearchForm } from './styled';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  value: string;
}

const Search = ({ onChange, onClick, value }: Props) => (
  <SearchForm onSubmit={onClick}>
    <input type="text" onChange={onChange} value={value} />
    <span onClick={onClick}>
      <img src="/search.svg" alt="search" />
    </span>
  </SearchForm>
);

export default Search;
