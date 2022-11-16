import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { describe } from '@jest/globals';
import { createMockPractitionerFeedListItems } from './PractitionerFeedListItem.mocks';
import PractitionerFeed from './PractitionerFeed';

let documentBody: RenderResult;

describe('<PractitionerFeed />', () => {
  beforeEach(() => {
    documentBody = render(
      <PractitionerFeed
       practitioners={createMockPractitionerFeedListItems()}
      />
    );
  });

  it('renders without crashing', () => {
    expect(documentBody.getByText('Practitioner #2')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
})
