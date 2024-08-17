import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '@/components/Search';
import { useQueryParams } from '@/hooks/useQueryParams';
import { QUERY_PARAMS } from '@/constants/common';

jest.mock('@/hooks/useQueryParams', () => ({
  useQueryParams: jest.fn(),
}));

describe('Search Component', () => {
  const getQueryParamMock = jest.fn();
  const setQueryParamMock = jest.fn();

  beforeEach(() => {
    getQueryParamMock.mockClear();
    setQueryParamMock.mockClear();
    useQueryParams.mockImplementation(() => ({
      getQueryParam: getQueryParamMock,
      setQueryParam: setQueryParamMock,
    }));
  });

  it('renders with the correct default value from the query param', () => {
    getQueryParamMock.mockReturnValue('Inception');

    render(<Search />);

    const inputElement = screen.getByPlaceholderText(/Search for a movie title/i);
    expect(inputElement).toHaveValue('Inception');
  });

  it('clears the input value when currentSearchValue is not set', () => {
    getQueryParamMock.mockReturnValue('');

    render(<Search />);

    const inputElement = screen.getByPlaceholderText(/Search for a movie title/i);
    expect(inputElement).toHaveValue('');
  });

  it('calls setQueryParam with the correct value when input changes', () => {
    getQueryParamMock.mockReturnValue('Inception');

    render(<Search />);

    const inputElement = screen.getByPlaceholderText(/Search for a movie title/i);
    
    fireEvent.change(inputElement, { target: { value: 'Interstellar' } });

    expect(setQueryParamMock).toHaveBeenCalledWith({
      key: QUERY_PARAMS.SEARCH,
      value: 'Interstellar',
      path: '/',
      replaceAll: true,
    });
  });
});
