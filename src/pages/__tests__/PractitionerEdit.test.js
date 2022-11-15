import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from '../../redux/store';
import * as Constants from '../../redux/practitioner/constants';
import PractitionerEdit from '../PractitionerEdit';
import { cleanup, render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { delay } from '../../../test/config';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios', () => {
  return {
    put: jest.fn(() => {
      return new Promise((resolve) => {
        resolve({
          data: {},
          headers: {}
        })
      })
    }),
    init: () => { }
  };
});

afterEach(cleanup);

const practitioner = {
  id: '123',
  firstName: 'Test',
  lastName: 'User',
  address: 'Test address',
  phone: '123456789',
  fax: '123456789',
  email: 'test@user.com'
};
store.dispatch(
  { type: Constants.FETCH_PRACTITIONERS_SUCCESS, payload: {practitioners: [practitioner]} }
);

const setup = (id) => {
  const utils = render(
    <Provider store={store}>
      <Router
        initialEntries={[`/practitioners/${id}/edit`]}
      >
        <Routes>
          <Route path="/practitioners/:id/edit" element={<PractitionerEdit />} exact />
        </Routes>
      </Router>
    </Provider>
  );

  return { ...utils };
};

it('should render practitioner show', async () => {
  setup(123);

  await act(async () => {
    fireEvent.change(document.getElementById('practitioner_firstName'), {
      target: {
        value: "Test 1"
      }
    });
    fireEvent.change(document.getElementById('practitioner_lastName'), {
      target: {
        value: "User 2"
      }
    });
    fireEvent.change(document.getElementById('practitioner_address'), {
      target: {
        value: ""
      }
    });
    fireEvent.click(document.querySelector('button[type="submit"]'));

    setTimeout(() => {
      expect(screen.getByText(/Please input address/i)).toBeInTheDocument();
    }, 2000);

    fireEvent.change(document.getElementById('practitioner_address'), {
      target: {
        value: "Test Address 1"
      }
    });
    fireEvent.click(document.querySelector('button[type="submit"]'));
  });

  expect(screen.getByText(/Practitioner Edit/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Fax/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();

}, 20000);

it('should render null', async () => {
  setup(124);

  expect(document.getElementById('practitioner_firstName').value).toEqual('');
  expect(document.getElementById('practitioner_lastName').value).toEqual('');
  expect(document.getElementById('practitioner_address').value).toEqual('');
  expect(document.getElementById('practitioner_phone').value).toEqual('');
  expect(document.getElementById('practitioner_fax').value).toEqual('');
  expect(document.getElementById('practitioner_email').value).toEqual('');
}, 20000);
