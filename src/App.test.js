import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page', async () => {
  await act( async () => render(<App />));
  expect(screen.getByRole('app-content')).toBeInTheDocument();
});
