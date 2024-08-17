'use client';

import { useQueryParams } from '@/hooks/useQueryParams';
import { QUERY_PARAMS } from '@/constants/common';
import classes from './genres.module.css';

export type GenresProps = {
  id: string;
  title: string
}

export const Genres = ({ items }: { items: GenresProps[] }) => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const currentGenreValue = getQueryParam(QUERY_PARAMS.GENRE)

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const isAllGenres = e.target.value === 'all';
    const queryValue = isAllGenres ? '' : value
    setQueryParam({ key: QUERY_PARAMS.GENRE, value: queryValue, path: '/', replaceAll: true });
  };
  
  return (
    <div className={classes.genres_wrapper}>
      <select name="genres" onChange={handleGenreChange} value={currentGenreValue}>
        <option key="all-1" value="all">All Genres</option>
        {items.map((genre) => {
          return (
            <option key={genre.id} value={genre.title}>
              {genre.title}
            </option>
          );
        })}
      </select>
    </div>

  )
}