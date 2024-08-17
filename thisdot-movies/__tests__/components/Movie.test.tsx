import { render, screen } from '@testing-library/react';
import { Movie } from '@/components/Movie';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

describe('Movie Component', () => {
  it('renders the movie title and link correctly', () => {
    const props = {
      id: '1',
      title: 'Test Movie',
      posterUrl: 'http://example.com/poster.jpg',
      rating: 'PG-13',
    };

    render(<Movie {...props} />);

    expect(screen.getByRole('heading', { name: /Test Movie/i })).toBeInTheDocument();

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/movie/1');
  });

  it('displays the rating when provided', () => {
    const props = {
      id: '1',
      title: 'Test Movie',
      rating: 'PG-13',
    };

    render(<Movie {...props} />);

    expect(screen.getByText(/Rating: PG-13/i)).toBeInTheDocument();
  });

  it('does not display rating when not provided', () => {
    const props = {
      id: '1',
      title: 'Test Movie',
    };

    render(<Movie {...props} />);

    expect(screen.queryByText(/Rating:/i)).not.toBeInTheDocument();
  });
});
