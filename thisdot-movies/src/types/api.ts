import { SearchQueryParams } from '.';
import { type MovieProps } from '@/components/Movie';
import { type GenresProps } from '@/components/Genres';

/**
 * Fetch movies types
 */
export type FetchMoviesParams = {
  token: string;
  searchParams?: SearchQueryParams
}

export type FetchMoviesResponse = {
  data: MovieProps[];
  totalPages: number;
}

/**
 * Fetch movie types
 */
export type FetchMovieDetailsParams = {
  token: string;
  id: string;
}

export type FetchMovieDetailsResponse = MovieProps & {
  summary: string;
  duration: string;
  directors: string[];
  mainActors: string[];
  datePublished: string;
  ratingValue: number;
  bestRating: number;
  worstRating: number;
  writers: string[];
  genres: GenresProps[];
}

/**
 * Fetch genres types
 */
export type GenresResponse = {
  data: GenresProps[];
}