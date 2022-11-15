import { store } from '../store';
import '@testing-library/jest-dom';

it('should have a store', () => {
  expect(store).toBeTruthy;
});
