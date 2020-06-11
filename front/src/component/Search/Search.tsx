import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { SearchForm } from './styled';

const Search = () => (
  <SearchForm>
    <input type="text" />
    <SearchOutlined />
  </SearchForm>
);

export default Search;
