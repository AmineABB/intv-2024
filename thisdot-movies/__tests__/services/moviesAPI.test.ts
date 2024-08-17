import { fetchMovies, fetchMovieDetails, fetchGenres } from '@/services/moviesAPI';
import { fetcher } from '@/utils/customFetch';
import { ENDPOINTS } from '@/constants/api';

jest.mock('@/utils/customFetch', () => ({
  fetcher: jest.fn(),
}));

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchMovies', () => {
    it('constructs the URL with query parameters and calls fetcher', async () => {
      const mockToken = 'mockToken';
      const mockSearchParams = { search: 'test', genre: 'action' };
      const mockResponse = { data: [] };
      
      fetcher.mockResolvedValue(mockResponse);

      const { data } = await fetchMovies({ token: mockToken, searchParams: mockSearchParams });

      const queryString = new URLSearchParams(mockSearchParams).toString();
      const expectedUrl = `${ENDPOINTS.MOVIES}?${queryString}`;

      expect(fetcher).toHaveBeenCalledWith({ url: expectedUrl, token: mockToken });
      expect(data).toEqual(mockResponse.data);
    });

    it('constructs the URL without query parameters if none are provided', async () => {
      const mockToken = 'mockToken';
      const mockResponse = { data: [] };

      fetcher.mockResolvedValue(mockResponse);

      const { data } = await fetchMovies({ token: mockToken, searchParams: {} });

      expect(fetcher).toHaveBeenCalledWith({ url: ENDPOINTS.MOVIES, token: mockToken });
      expect(data).toEqual(mockResponse.data);
    });
  });

  describe('fetchMovieDetails', () => {
    it('constructs the URL and calls fetcher', async () => {
      const mockToken = 'mockToken';
      const mockId = '123';
      const mockResponse = { id: mockId, title: 'Mock Movie' };

      fetcher.mockResolvedValue(mockResponse);

      const { id, title } = await fetchMovieDetails({ token: mockToken, id: mockId });

      const expectedUrl = `${ENDPOINTS.MOVIE_DETAILS(mockId)}`;

      expect(fetcher).toHaveBeenCalledWith({ url: expectedUrl, token: mockToken });
      expect(id).toBe(mockId);
      expect(title).toBe('Mock Movie');
    });
  });

  describe('fetchGenres', () => {
    it('constructs the URL and calls fetcher', async () => {
      const mockToken = 'mockToken';
      const mockResponse = { genres: [] };

      fetcher.mockResolvedValue(mockResponse);

      const { genres } = await fetchGenres(mockToken);

      expect(fetcher).toHaveBeenCalledWith({ url: ENDPOINTS.GENRES, token: mockToken });
      expect(genres).toEqual(mockResponse.genres);
    });
  });
});
