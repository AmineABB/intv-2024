'use client';

import { useEffect, useRef } from 'react';
import { useQueryParams } from '@/hooks/useQueryParams';
import { QUERY_PARAMS } from '@/constants/common';
import classes from './search.module.css';

export const Search = () => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const currentSearchValue = getQueryParam(QUERY_PARAMS.SEARCH);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setQueryParam({ key: QUERY_PARAMS.SEARCH, value, path: '/', replaceAll: true });
  };

  useEffect(() => {
    if (!currentSearchValue && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [currentSearchValue]);

  return (
    <div className={classes.search__container}>
      <input
        ref={inputRef}
        className={classes.search__field} 
        id="search" 
        name="search" 
        type="text" 
        placeholder="Search for a movie title"
        defaultValue={currentSearchValue}
        onChange={handleSearch} />
    </div>
  )
}