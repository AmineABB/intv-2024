import { render, screen, fireEvent } from '@testing-library/react';
import { Genres } from '@/components/Genres';
import { useQueryParams } from '@/hooks/useQueryParams';
import { QUERY_PARAMS } from '@/constants/common';

jest.mock('@/hooks/useQueryParams', () => ({
  useQueryParams: jest.fn(),
}));

describe('Genres Component', () => {
  const setQueryParamMock = jest.fn();
  const getQueryParamMock = jest.fn();

  beforeEach(() => {
    setQueryParamMock.mockClear();
    getQueryParamMock.mockClear();
    
    useQueryParams.mockImplementation(() => ({
      getQueryParam: getQueryParamMock,
      setQueryParam: setQueryParamMock,
    }));
  });

  it('renders genres options correctly', () => {
    const items = [
      { id: '1', title: 'Action' },
      { id: '2', title: 'Comedy' },
    ];

    getQueryParamMock.mockReturnValue('Action');

    render(<Genres items={items} />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('Action');

    expect(screen.getByRole('option', { name: /All Genres/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Action/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Comedy/i })).toBeInTheDocument();
  });

  it('calls setQueryParam with the correct parameters when an option is selected', () => {
    const items = [
      { id: '1', title: 'Action' },
      { id: '2', title: 'Comedy' },
    ];

    getQueryParamMock.mockReturnValue('Action');

    render(<Genres items={items} />);
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'Comedy' } });

    expect(setQueryParamMock).toHaveBeenCalledWith({
      key: QUERY_PARAMS.GENRE,
      value: 'Comedy',
      path: '/',
      replaceAll: true,
    });
  });

  it('calls setQueryParam with an empty value when "All Genres" is selected', () => {
    const items = [
      { id: '1', title: 'Action' },
      { id: '2', title: 'Comedy' },
    ];

    getQueryParamMock.mockReturnValue('Action');

    render(<Genres items={items} />);
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'all' } });

    expect(setQueryParamMock).toHaveBeenCalledWith({
      key: QUERY_PARAMS.GENRE,
      value: '',
      path: '/',
      replaceAll: true,
    });
  });
});
