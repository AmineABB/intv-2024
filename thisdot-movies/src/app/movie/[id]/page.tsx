import { fetchMovieDetails } from '@/services/moviesAPI';
import { useAccessToken } from '@/hooks/useAccessToken';
import { MovieDetails } from '@/components/MovieDetails';
import { Suspense } from 'react';

type MovieDetailsProps = {
  params: {
    id: string;
  }
}

export default async function MovieDetailsPage({ params }: MovieDetailsProps) {
  const token = useAccessToken();
  const { id } = params;
  const data = await fetchMovieDetails({ token, id });

  return (
    <Suspense>
      <MovieDetails item={data} />
    </Suspense>
  )
}
