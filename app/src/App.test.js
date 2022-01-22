import { render, screen } from '@testing-library/react';
import App from './App';

test('renders wordle', () => {
  render(<App />);
  const linkElement = screen.getByText(/wordle/i);
  expect(linkElement).toBeInTheDocument();
});
