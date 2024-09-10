
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  test('renders the counter component', () => { //it
    render(<Counter />);
    const counterElement = screen.getByText(/Counter:/i);
    expect(counterElement).toBeInTheDocument();
  });

  test('increments the counter', () => {
    render(<Counter />);
    const incrementButton = screen.getByText(/Increment/i);
    fireEvent.click(incrementButton);
    const counterElement = screen.getByText(/Counter: 1/i);
    expect(counterElement).toBeInTheDocument();
  });

  test('decrements the counter', () => {
    render(<Counter />);
    const decrementButton = screen.getByText(/Decrement/i);
    fireEvent.click(decrementButton);
    const counterElement = screen.getByText(/Counter: -1/i);
    expect(counterElement).toBeInTheDocument();
  });
});