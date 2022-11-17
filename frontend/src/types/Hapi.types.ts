export interface HapiTelecomItem {
  system: string,
  value: string,
}

export enum HapiTelecomType {
  EMAIL = 'email',
  PHONE = 'phone',
  FAX = 'fax'
}

export interface HapiPractitionersResponse {
  resourceType: string;
  id: string;
  meta: Meta;
  type: string;
  link?: HapiLinkItem[] | null;
  entry?: HapiPractitionerEntryItem[] | null;
}
export interface Meta {
  lastUpdated: string;
}
export interface HapiLinkItem {
  relation: string;
  url: string;
}
export interface HapiPractitionerEntryItem {
  fullUrl: string;
  resource: Resource;
  search: Search;
}
export interface Resource {
  resourceType: string;
  id: string;
  meta: Meta1;
  identifier?: HapiIdentifier[] | null;
  name?: NameEntity[] | null;
  gender?: string | null;
  communication?: CommunicationEntity[] | null;
  telecom?: HapiTelecomItem[] | null;
  active?: boolean | null;
  address?: AddressEntity[] | null;
}
export interface Meta1 {
  versionId: string;
  lastUpdated: string;
  source: string;
  profile?: string[] | null;
}
export interface HapiIdentifier {
  use?: string | null;
  system?: string | null;
  value: string;
}
export interface NameEntity {
  family: string;
  given?: string[] | null;
  prefix?: string[] | null;
}
export interface CommunicationEntity {
  coding?: CodingEntity[] | null;
}
export interface CodingEntity {
  system: string;
  code: string;
  display: string;
}
export interface IdentifierEntityOrTelecomEntity {
  system: string;
  value: string;
}
export interface AddressEntity {
  line?: string[] | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
export interface Search {
  mode: string;
}
