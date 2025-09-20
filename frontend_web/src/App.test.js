import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Swipe route by default', () => {
  render(<App />);
  const swipeHint = screen.getByText(/Find players nearby/i);
  expect(swipeHint).toBeInTheDocument();
});
