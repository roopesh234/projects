
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('Should render the page correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Add your assertions here
  expect(container).toBeInTheDocument();
});

