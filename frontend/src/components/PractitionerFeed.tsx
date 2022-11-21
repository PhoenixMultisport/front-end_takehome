import * as React from 'react';
import PractitionerFeedListItem from './PractitionerFeedListItem';
import { NormalizedPractitioner } from '../utils/helpers';

interface PractitionerFeedParams { practitioners: NormalizedPractitioner[] }

const PractitionerFeed: React.FC<PractitionerFeedParams> = (props: PractitionerFeedParams): JSX.Element => {
  return (
    <ul>
      {
        props.practitioners?.map((p: NormalizedPractitioner) => {
          return (
          <PractitionerFeedListItem
            key={p.id}
            practitioner={p}
          />
          )
        })
      }
    </ul>
  );
}

export default PractitionerFeed;
