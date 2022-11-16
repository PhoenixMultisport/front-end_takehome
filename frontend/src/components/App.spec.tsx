import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { describe } from '@jest/globals';
import App from './App';
import { Axios } from 'axios';

let documentBody: RenderResult;

describe('<App />', () => {
  beforeEach(async () => {
    await process.nextTick(() => {});

    documentBody = render(
      <App/>
    );

    jest.spyOn(Axios.prototype, 'get').mockResolvedValue([]);
  });

  it('renders without crashing', () => {
    expect(documentBody).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { baseElement } = documentBody;

    expect(baseElement).toMatchSnapshot();
  });
})
