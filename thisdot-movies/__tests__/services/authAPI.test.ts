import { fetchAccessToken } from '@/services/authAPI';
import { fetcher } from '@/utils/customFetch';
import { ENDPOINTS } from '@/constants/api';

jest.mock('@/utils/customFetch', () => ({
  fetcher: jest.fn(),
}));

describe('fetchAccessToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls fetcher with the correct endpoint and returns the token', async () => {
    const mockToken = 'mockToken123';
    const mockResponse = { token: mockToken };
    
    fetcher.mockResolvedValue(mockResponse);

    const result = await fetchAccessToken();

    expect(fetcher).toHaveBeenCalledWith({ url: ENDPOINTS.AUTH });
    expect(result).toBe(mockToken);
  });

  it('returns undefined if token is not present in the response', async () => {
    const mockResponse = {};

    fetcher.mockResolvedValue(mockResponse);

    const result = await fetchAccessToken();

    expect(fetcher).toHaveBeenCalledWith({ url: ENDPOINTS.AUTH });
    expect(result).toBeUndefined();
  });

  it('handles errors thrown by fetcher', async () => {
    const mockError = new Error('Network error');

    fetcher.mockRejectedValue(mockError);

    await expect(fetchAccessToken()).rejects.toThrow('Network error');
    expect(fetcher).toHaveBeenCalledWith({ url: ENDPOINTS.AUTH });
  });
});
