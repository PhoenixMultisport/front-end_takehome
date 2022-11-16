import React from 'react';
import { getPractitionerEmail } from '../utils/helpers';
import { HapiPractitionerEntryItem } from '../types/Hapi.types';
import moment from 'moment';

interface HapiPractitionerEntryItemParams {
  practitioner: HapiPractitionerEntryItem,
  id: number,
}

const PractitionerFeedListItem: React.FC<HapiPractitionerEntryItemParams> = ({ practitioner, id }: HapiPractitionerEntryItemParams): JSX.Element => {
  const practitionerEmail: string = getPractitionerEmail(practitioner.resource.telecom);

  return (
    <li key={practitioner.resource.id} className="text-left mb-5 bg-white text-black p-3 rounded-2xl px-10 drop-shadow-md hover:bg-gray-100">
      <h1 className="text-xl font-bold">{practitioner.resource.resourceType} #{id + 1}</h1>
      <ul>
        <li>
          <p>
            ID: { practitioner.resource.id }
          </p>
        </li>
        <li>
          <p>
            Last Updated: { moment(practitioner.resource.meta.lastUpdated).format('YYYY-MM-DD') }
          </p>
        </li>
        <li>
          <a className="hover:text-amber-300 block text-blue-600" href={`mailto:${practitionerEmail}`}>
            { practitionerEmail || ''}
          </a>
        </li>
        <li>
          <a className="hover:text-amber-300 block text-blue-600" href={practitioner.fullUrl}>
            Website
          </a>
        </li>
      </ul>
    </li>
  )
};

export default PractitionerFeedListItem;
