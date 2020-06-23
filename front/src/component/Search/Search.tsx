import React from 'react';

import { SearchForm } from './styled';

const Search = () => (
  <SearchForm>
    <input type="text" disabled />
    <span>
      <img src="/search.svg" alt="search" />
    </span>
  </SearchForm>
);

export default Search;
