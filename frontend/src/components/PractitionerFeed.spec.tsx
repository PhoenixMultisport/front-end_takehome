import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { describe } from '@jest/globals';
import {
  createMockPractitionerFeedListItem,
} from './PractitionerFeedListItem.mocks';
import PractitionerFeed from './PractitionerFeed';

let documentBody: RenderResult;

describe('<PractitionerFeed />', () => {
  beforeEach(() => {
    documentBody = render(
      <PractitionerFeed
       practitioners={[createMockPractitionerFeedListItem()]}
      />
    );
  });

  it('renders without crashing', () => {
    expect(documentBody).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
})
