import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders EBAC title', () => {
  render(<App />);
  const linkElement = screen.getByText(/EBAC/i);
  expect(linkElement).toBeInTheDocument();
});
