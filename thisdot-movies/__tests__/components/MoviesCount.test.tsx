import { render, screen } from '@testing-library/react';
import { MovieCount } from '@/components/MoviesCount';
import { useQueryParams } from '@/hooks/useQueryParams';
import { QUERY_PARAMS } from '@/constants/common';

jest.mock('@/hooks/useQueryParams', () => ({
  useQueryParams: jest.fn(),
}));

describe('MovieCount Component', () => {
  const getQueryParamMock = jest.fn();

  beforeEach(() => {
    getQueryParamMock.mockClear();
    useQueryParams.mockImplementation(() => ({
      getQueryParam: getQueryParamMock,
    }));
  });

  it('renders the movie count when there is a search query', () => {
    getQueryParamMock.mockImplementation((key) => {
      if (key === QUERY_PARAMS.SEARCH) return 'some search query';
      if (key === QUERY_PARAMS.GENRE) return null;
    });

    render(<MovieCount count={42} />);

    expect(screen.getByText(/Total Movies Available: 42/i)).toBeInTheDocument();
  });

  it('renders the movie count when there is a genre query', () => {
    getQueryParamMock.mockImplementation((key) => {
      if (key === QUERY_PARAMS.SEARCH) return null;
      if (key === QUERY_PARAMS.GENRE) return 'some genre';
    });

    render(<MovieCount count={42} />);

    expect(screen.getByText(/Total Movies Available: 42/i)).toBeInTheDocument();
  });

  it('does not render the movie count when there are no search or genre queries', () => {
    getQueryParamMock.mockImplementation(() => null);

    render(<MovieCount count={42} />);

    expect(screen.queryByText(/Total Movies Available:/i)).not.toBeInTheDocument();
  });
});
