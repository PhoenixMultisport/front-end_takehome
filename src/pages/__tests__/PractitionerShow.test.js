import React from 'react';
import { Provider } from 'react-redux';
import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import { store } from '../../redux/store';
import * as Constants from '../../redux/practitioner/constants';
import PractitionerShow from '../PractitionerShow';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);

const practitioner = {
  id: '123',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@user.com'
};
store.dispatch(
  { type: Constants.FETCH_PRACTITIONERS_SUCCESS, payload: {practitioners: [practitioner]} }
);

const setup = (id) => {
  const utils = render(
    <Provider store={store}>
      <Router
        initialEntries={[`/practitioners/${id}`]}
      >
        <Routes>
          <Route path="/practitioners/:id" element={<PractitionerShow />} exact />
        </Routes>
      </Router>
    </Provider>
  );

  return { ...utils };
};

it('should render practitioner show', async () => {
  setup(123);

  expect(screen.getByText(/Practitioner Details/i)).toBeInTheDocument();
  expect(screen.getByText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Address/i)).toBeInTheDocument();
  expect(screen.getByText(/Phone/i)).toBeInTheDocument();
  expect(screen.getByText(/Fax/i)).toBeInTheDocument();
  expect(screen.getByText(/Email/i)).toBeInTheDocument();
}, 20000);

it('should render null', async () => {
  const { container } = setup(124);

  expect(container.firstChild).toBeNull();
}, 20000);