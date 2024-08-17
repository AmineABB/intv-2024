export const ENDPOINTS = Object.freeze({
  AUTH: `/auth/token`,
  HEALTHCHECK: `/healthcheck`,
  MOVIES: `/movies`,
  GENRES: '/genres/movies',
  MOVIE_DETAILS: (id: string) => `/movies/${id}`,
});