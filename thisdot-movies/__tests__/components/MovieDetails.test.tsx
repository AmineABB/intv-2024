import { render, screen } from '@testing-library/react';
import { MovieDetails } from '@/components/MovieDetails';
import { movieDetailsMock } from '../../mocks/movieDetailsMock';

jest.mock('@/components/BackButton', () => ({
  BackButton: () => <button>Back</button>,
}));

describe('MovieDetails Component', () => {
  it('renders movie details correctly', () => {
    render(<MovieDetails item={movieDetailsMock} />);

    expect(screen.getAllByText(/Inception/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/PG-13/i)).toBeInTheDocument();
    expect(screen.getByText(/148 min/i)).toBeInTheDocument();
    expect(screen.getByText(/7\/16\/2010/i)).toBeInTheDocument();
    expect(screen.getByText(/A thief who enters the dreams of others to steal secrets from their subconscious is given a chance to have his criminal history erased./i)).toBeInTheDocument();
    expect(screen.getByText(/Christopher Nolan/i)).toBeInTheDocument();
    expect(screen.getByText(/Leonardo DiCaprio, Joseph Gordon-Levitt/i)).toBeInTheDocument();
    expect(screen.getByText(/Action, Sci-Fi/i)).toBeInTheDocument();
    expect(screen.getByText(/8.8 \/ 10/i)).toBeInTheDocument();
  });

  it('renders the BackButton component', () => {
    render(<MovieDetails item={movieDetailsMock} />);

    // Check if BackButton is rendered
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });
});
