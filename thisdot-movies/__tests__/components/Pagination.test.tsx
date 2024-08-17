import { render, screen } from '@testing-library/react';
import { Pagination } from '@/components/Pagination';
import { useQueryParams } from '@/hooks/useQueryParams';
import { QUERY_PARAMS } from '@/constants/common';
import userEvent from '@testing-library/user-event';

jest.mock('@/hooks/useQueryParams', () => ({
  useQueryParams: jest.fn(),
}));

describe('Pagination Component', () => {
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

  it('renders the correct number of page buttons and navigation buttons', () => {
    const totalPages = 5;

    getQueryParamMock.mockReturnValue('1');

    render(<Pagination totalPages={totalPages} />);

    expect(screen.getAllByRole('button')).toHaveLength(totalPages + 1);
  });

  it('shows the Previous button when currentPage is greater than 1', () => {
    getQueryParamMock.mockReturnValue('2');

    render(<Pagination totalPages={5} />);

    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
  });

  it('does not show the Previous button when currentPage is 1', () => {
    getQueryParamMock.mockReturnValue('1');

    render(<Pagination totalPages={5} />);

    expect(screen.queryByText(/Previous/i)).not.toBeInTheDocument();
  });

  it('shows the Next button when currentPage is less than totalPages', () => {
    getQueryParamMock.mockReturnValue('2');

    render(<Pagination totalPages={5} />);

    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it('does not show the Next button when currentPage is equal to totalPages', () => {
    getQueryParamMock.mockReturnValue('5');

    render(<Pagination totalPages={5} />);

    expect(screen.queryByText(/Next/i)).not.toBeInTheDocument();
  });

  it('calls setQueryParam with correct page number when a page button is clicked', async () => {
    getQueryParamMock.mockReturnValue('1'); 

    render(<Pagination totalPages={5} />);

    const pageButton = screen.getByText('3');
    
    await userEvent.click(pageButton);

    expect(setQueryParamMock).toHaveBeenCalledWith({
      key: QUERY_PARAMS.PAGE,
      value: '3',
    });
  });

  it('applies the active class to the current page button', () => {
    getQueryParamMock.mockReturnValue('2');

    render(<Pagination totalPages={5} />);

    const activeButton = screen.getByText('2');
    expect(activeButton).toHaveClass('pagination_item__active');
  });
});
