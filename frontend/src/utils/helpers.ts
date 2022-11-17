import {
  HapiPractitionerEntryItem,
  HapiTelecomItem,
  HapiTelecomType,
  Resource
} from '../types/Hapi.types';

export const getPractitionerEmail = (telecomItems: HapiTelecomItem[]) => {
  let email: string = '';

  if (telecomItems) {
    const foundEmail: HapiTelecomItem[] = telecomItems.filter((ti) => ti.system === HapiTelecomType.EMAIL);

    if (foundEmail) {
      email = foundEmail[0].value;
    }
  }

  return email
}

interface getFullNameType { firstName: string, lastName: string }

export const getFullName = (resource: Resource): getFullNameType => {
  let firstName: string = '';
  let lastName: string = '';

  if (resource.name) {
    firstName = resource.name[0]?.given?.join(' ') || '';
    lastName = resource.name[0].family || '';
  }

  return { firstName, lastName };
}

export const getEmail = (resource: Resource): string => {
  let email: string = '';

  if (resource.telecom) {
    email = resource?.telecom?.filter((t: HapiTelecomItem) => t.system === HapiTelecomType.EMAIL)[0]?.value;
  }

  return email;
}

export const getAddress = (resource: Resource): { address: string } => {
  let address: string = '';

  if (resource.address) {
    address = resource.address.map((a) => a).join(' ');
  }
  return { address };
}

export const getFormattedPhone = (resource: Resource): string => {
  let phone: string = '';

  if (resource.telecom) {
    resource?.telecom?.filter((t: HapiTelecomItem) => t.system === HapiTelecomType.PHONE)[0]?.value;
  }

  return phone;
}

export const getFax = (resource: Resource): string => {
  let fax: string = '';

  if (resource.telecom) {
    resource?.telecom?.filter((t: HapiTelecomItem) => t.system === HapiTelecomType.PHONE)[0]?.value;
  }

  return fax;
}

interface GetTelecomInfoType { phone: string, fax: string, email: string }

export const getTelecomInfo = (resource: Resource): GetTelecomInfoType => {
  let phone: string = '';
  let fax: string = '';
  let email: string = '';

  if (resource.telecom) {
    phone = getFormattedPhone(resource);
    fax = getFax(resource)
    email = getEmail(resource);
  }

  return { phone, fax, email };
}

export interface NormalizedPractitioner {
  id: string,
  firstName: string,
  lastName: string,
  phone: string,
  fax: string,
  email: string,
  address: string,
}

export const normalizeFetchedPractitioners = (entries: HapiPractitionerEntryItem[]): NormalizedPractitioner[] => {
  return entries.map((en) => {
    return normalizePractitionerResult(en.resource);
  })
}

export const normalizePractitionerResult = (resource: Resource): NormalizedPractitioner => {
  const { firstName, lastName } = getFullName(resource);
  const { phone, email, fax } = getTelecomInfo(resource);
  const { address } = getAddress(resource);

  return {
    id: resource.id,
    firstName,
    lastName,
    phone,
    fax,
    email,
    address,
  }
}

export const getLabelNameFromPractitionerResult = (key: string) => {
  switch (key) {
    case 'id':
      return 'Id';
    case 'firstName':
      return 'First name';
    case 'lastName':
      return 'Last name';
    case 'phone':
      return 'Phone';
    case 'fax':
      return 'Fax';
    case 'email':
      return 'Email';
    case 'address':
      return 'Address';
    case 'lastUpdated':
      return 'Last Updated';
  }
}
