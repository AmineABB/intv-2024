import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BackButton } from '@/components/BackButton';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('BackButton', () => {
  it('renders the button with the correct text', () => {
    render(<BackButton />);
    const buttonElement = screen.getByRole('button', { name: /← Back/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls router.back when the button is clicked', async () => {
    const backMock = jest.fn();
    
    (useRouter as any).mockImplementation(() => ({
      back: backMock,
    }));
    
    render(<BackButton />);
    const buttonElement = screen.getByRole('button', { name: /← Back/i });
    
    await userEvent.click(buttonElement);
    
    expect(backMock).toHaveBeenCalledTimes(1);
  });
});
