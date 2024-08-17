import { useAccessToken } from '@/hooks/useAccessToken';
import { headers } from 'next/headers';

jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

describe('useAccessToken Hook', () => {
  it('returns the authorization token from headers', () => {
    const mockToken = 'Bearer mockToken123';
    
    headers.mockReturnValue({
      get: jest.fn().mockReturnValue(mockToken),
    });

    const result = useAccessToken();

    expect(headers).toHaveBeenCalled();
    expect(result).toBe(mockToken);
  });

  it('returns undefined if the authorization header is not present', () => {
    headers.mockReturnValue({
      get: jest.fn().mockReturnValue(undefined),
    });

    const result = useAccessToken();

    expect(headers).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('returns an empty string if the authorization header is an empty string', () => {
    headers.mockReturnValue({
      get: jest.fn().mockReturnValue(''),
    });

    const result = useAccessToken();

    expect(headers).toHaveBeenCalled();
    expect(result).toBe('');
  });
});
