export interface HapiPractitionersResponse {
  resourceType: string,
  id: string,
  meta: {
    lastUpdated: string,
  },
  type: string,
  link: HapiLinkItem[],
  entry: HapiPractitionerEntryItem[],
}

export interface HapiPractitionerEntryItem {
  fullUrl: string,
  resource: {
    resourceType: 'Practitioner',
    id: string,
    meta: {
      versionId: string,
      lastUpdated: string,
    },
    identifier: HapiIdentifier[],
    telecom: HapiTelecomItem[]
  },
  search: {
    mode: string,
  }
}

interface HapiLinkItem {
  relation: string,
  url: string,
}

export interface HapiTelecomItem {
  system: string,
  value: string,
}

export interface HapiIdentifier {
  system: string,
  value: string,
}

export enum HapiTelecomType {
  EMAIL = 'email'
}
