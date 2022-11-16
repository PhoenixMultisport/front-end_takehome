import { HapiPractitionerEntryItem } from '../types/Hapi.types';
import { faker } from '@faker-js/faker';

export const createMockPractitionerFeedListItem = (): HapiPractitionerEntryItem => {
  return {
    fullUrl: 'http://shallow-gastropod.org',
    resource: {
      id: '6ba911c4-b549-4cd5-9ac4-7172ae5a5d88',
      identifier: [
        {
          system: 'http://failing-erosion.info',
          value: 'a1c136f8-4366-4034-9026-e5bd99f1da85',
        }
      ],
      meta: {
        lastUpdated: '2022-06-13',
        versionId: '',
      },
      resourceType: 'Practitioner',
      telecom: [
        {
          system: 'email',
          value: 'Gabriella58@hotmail.com',
        }
      ]
    },
    search: {mode: ''}
  }
}

export const createMockPractitionerFeedListItems = (): HapiPractitionerEntryItem[] => {
  return Array.from(Array(100), () => createMockPractitionerFeedListItem());
}
