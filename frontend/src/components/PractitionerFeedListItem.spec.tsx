import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import PractitionerFeedListItem from './PractitionerFeedListItem';
import { describe } from '@jest/globals';
import { createMockPractitionerFeedListItem } from './PractitionerFeedListItem.mocks';

let documentBody: RenderResult;

describe('<PractitionerFeedListItem />', () => {
  beforeEach(() => {
    documentBody = render(
      <PractitionerFeedListItem
        practitioner={createMockPractitionerFeedListItem()}
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
