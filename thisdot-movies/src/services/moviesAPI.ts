import { ENDPOINTS } from '@/constants/api';
import { fetcher } from '@/utils/customFetch';
import { FetchMoviesParams, FetchMoviesResponse, FetchMovieDetailsParams, FetchMovieDetailsResponse, GenresResponse } from '@/types/api';

export const fetchMovies = async ({ token, searchParams }: FetchMoviesParams): Promise<FetchMoviesResponse> => {
  const queryString = new URLSearchParams(searchParams).toString();
  const url = `${ENDPOINTS.MOVIES}${queryString ? `?${queryString}` : ''}`;
  return await fetcher({ url, token });
};

export const fetchMovieDetails = async ({ token, id }: FetchMovieDetailsParams): Promise<FetchMovieDetailsResponse> => {
  const url = `${ENDPOINTS.MOVIE_DETAILS(id)}`;
  return await fetcher({ url, token });
};

export const fetchGenres = async (token: string): Promise<GenresResponse> => {
  const url = `${ENDPOINTS.GENRES}`;
  return await fetcher({ url, token });
}