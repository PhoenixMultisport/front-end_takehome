import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import PractitionerFeedListItem from './PractitionerFeedListItem';
import { describe } from '@jest/globals';

let documentBody: RenderResult;

describe('<PractitionerFeedListItem />', () => {
  beforeEach(() => {
    documentBody = render(
      <PractitionerFeedListItem
        itemKey={'item-key'}
        resourceType={'resource-type'}
        email={'email'}
        url={'url'}
      />
    );
  });

  it('renders without crashing', () => {
    expect(documentBody.getByText('resource-type')).toBeInTheDocument();
    expect(documentBody.getByText('Website')).toBeInTheDocument();
    expect(documentBody.getByText('Email')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
})
