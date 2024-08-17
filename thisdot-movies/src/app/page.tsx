import { Fragment, Suspense } from 'react';
import { fetchMovies } from '@/services/moviesAPI';
import { useAccessToken } from '@/hooks/useAccessToken';
import { Movie } from '@/components/Movie';
import { SearchQueryParams } from '@/types';
import { Pagination } from '@/components/Pagination';
import classes from '@/styles/home.module.css';
import { MovieCount } from '@/components/MoviesCount';

type Movies = {
  searchParams: SearchQueryParams;
}

export default async function Movies({ searchParams }: Movies) {
  const token = useAccessToken();
  const { data, totalPages } = await fetchMovies({ token, searchParams });
  const hasData = data?.length > 0;

  return (
    <main className={classes.main}>
      <Suspense>
        {hasData && <MovieCount count={data.length} />}
        <div className={classes.grid}>
          {!hasData && (
            <p className={classes.notFound}>Oops..! We didn&apos;t find any results for your search.</p>
          )}
          {hasData && data.map((props) => (
            <Fragment key={props.id}>
              <Movie {...props} />
            </Fragment>
          ))}
        </div>
        {totalPages > 0 && <Pagination totalPages={totalPages} />}        
      </Suspense>
    </main>
  );
}
