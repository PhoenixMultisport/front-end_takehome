import { HapiPractitionerEntryItem } from '../types/Hapi.types';
import PractitionerFeedListItem from './PractitionerFeedListItem';
import * as React from 'react';

interface PractitionerFeedParams { practitioners: HapiPractitionerEntryItem[] }

const PractitionerFeed: React.FC<PractitionerFeedParams> = (props: PractitionerFeedParams): JSX.Element => {
  return (
    <ul>
      {
        props.practitioners?.map((p: HapiPractitionerEntryItem, i: number) => {
          return (
            <PractitionerFeedListItem
              key={i}
              id={i}
              practitioner={p}
            />
          )
        })
      }
    </ul>
  );
}

export default PractitionerFeed;
