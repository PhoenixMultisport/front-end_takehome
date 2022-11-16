import { HapiTelecomItem, HapiTelecomType } from '../types/Hapi.types';

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
