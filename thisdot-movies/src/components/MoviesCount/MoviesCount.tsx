'use client';

import { QUERY_PARAMS } from '@/constants/common';
import { useQueryParams } from '@/hooks/useQueryParams';
import classes from './movieCount.module.css';

type MovieCountProps = {
  count: number
}

export const MovieCount = ({ count }: MovieCountProps) => {
  const { getQueryParam } = useQueryParams();
  const hasSearchQuery = getQueryParam(QUERY_PARAMS.SEARCH);
  const hasGenreQuery = getQueryParam(QUERY_PARAMS.GENRE)

  return (hasSearchQuery || hasGenreQuery) && (
    <p className={classes.container}>Total Movies Available: {count}</p>
  )
}