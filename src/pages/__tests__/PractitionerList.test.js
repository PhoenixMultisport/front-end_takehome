import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../redux/store';
import PractitionerList from '../PractitionerList';
import { act, cleanup, render, screen } from '@testing-library/react';
import { delay } from '../../../test/config';
import '@testing-library/jest-dom';
import axios from 'axios';
import response from '../../__mocks__/response.json';
import searchResponse from '../../__mocks__/search.json';

const history = createMemoryHistory();
const route = '/';
history.push(route);

afterEach(cleanup);

const setup = () => {
  const utils = render(
    <Provider store={store}>
      <Router
        location={history.location}
        navigator={history}
        history={history}
      >
        <PractitionerList />
      </Router>
    </Provider>
  );

  return { ...utils };
};

it('should render practitioner list with success', async () => {
  axios.get.mockResolvedValue({data: response });

  await act(async () => {
    setup();
    await delay();
  });

  expect(screen.getByText(/Practitioner List/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Given name search/i)).toBeInTheDocument();
  expect(document.querySelectorAll('tbody tr').length).toEqual(response.entry.length);
}, 20000);

it('should render practitioner list with error', async () => {
  const apiError = new Error('Unknown API Error');
  axios.get.mockRejectedValueOnce(apiError);

  await act(async () => {
    setup();
    await delay();
  });

  expect(screen.getByText(/Unknown API Error/i)).toBeInTheDocument();
}, 20000);

it('should render practitioner list with success', async () => {
  axios.get.mockResolvedValue({data: searchResponse });

  await act(async () => {
    setup();
    await delay();
  });

  expect(document.querySelectorAll('tbody tr').length).toEqual(searchResponse.entry.length);
}, 20000);
