import { renderHook, act } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQueryParams } from '@/hooks/useQueryParams';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useQueryParams Hook', () => {
  const mockReplace = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    usePathname.mockReturnValue('/currentPath');
    useRouter.mockReturnValue({ replace: mockReplace });
    useSearchParams.mockReturnValue(mockSearchParams);
  });

  it('sets a query parameter correctly', () => {
    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.setQueryParam({ key: 'test', value: 'value' });
    });

    expect(mockReplace).toHaveBeenCalledWith('/currentPath?test=value');
  });

  it('replaces all parameters when replaceAll is true', () => {
    mockSearchParams.set('existing', 'value1');

    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.setQueryParam({ key: 'new', value: 'value2', replaceAll: true });
    });

    expect(mockReplace).toHaveBeenCalledWith('/currentPath?new=value2');
  });

  it('gets a query parameter correctly', () => {
    mockSearchParams.set('test', 'value');

    const { result } = renderHook(() => useQueryParams());

    const value = result.current.getQueryParam('test');
    expect(value).toBe('value');
  });

  it('returns an empty string if the query parameter is not found', () => {
    const { result } = renderHook(() => useQueryParams());

    const value = result.current.getQueryParam('nonexistent');
    expect(value).toBe('');
  });
});
