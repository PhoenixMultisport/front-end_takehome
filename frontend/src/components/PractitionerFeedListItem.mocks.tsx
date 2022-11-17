import { NormalizedPractitioner } from '../utils/helpers';

export const createMockPractitionerFeedListItem = (): NormalizedPractitioner => {
  return {
    address: 'address',
    email: 'email',
    fax: 'fax',
    firstName: 'first-name',
    id: 'unique-id',
    lastName: 'last-name',
    phone: 'phone',
  }
}

export const createMockPractitionerFeedListItems = (): NormalizedPractitioner[] => {
  return Array.from(Array(100), () => createMockPractitionerFeedListItem());
}
