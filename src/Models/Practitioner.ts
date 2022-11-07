type Practitioner = {
  fullUrl: string;
  resource: Resource;
  search: Search;
}

type PractitionerPage = {
  page: number;
  practitioners: PractitionerRawRes;
}

type Resource = {
  id: string;
  identifier?: ResourceIdentifier[];
  meta: ResMeta;
  resourceType: string;
  telecom?: Telecom[];
  name?: Name[];
  address?: Address[];
  qualification?: Qualification[];
}

type Qualification = {
  identifier?: any;
  code?: QualificationCode;
}

type Address = {
  type?: string;
  line?: string[];
  city?: string;
  state?: string;
  postalCode?: string,
  country?: string;
}

type ResourceIdentifier = {
  system?: string;
  value?: string;
}

type QualificationCode = {
  text?: string;
}

type Telecom = {
  system?: string;
  value?: string;
}

type Search = {
  mode?: string;
}

type Name = {
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
}

type PractitionerRawRes = {
  resourceType: string;
  id: string;
  meta: ResMeta;
  type: string;
  entry: Practitioner[];
  link: ResLink[];
}

type ResMeta = {
  versionId?: string,
  lastUpdated?: string
}

type ResLink = {
  relation: string,
  url: string
}


// {
//  "fullUrl": "https://hapi.fhir.org/baseDstu3/Practitioner/25029",
//   "resource": {
//     "resourceType": "Practitioner",
//     "id": "25029",
//     "meta": {
//       "versionId": "4",
//       "lastUpdated": "2018-10-01T13:14:01.545+00:00"
//     },
//     "identifier": [ {
//        "system": "http://clinfhir.com/fhir/NamingSystem/practitioner",
//       "value": "PCP123"
//     } ],
//     "name": [ {
//       "text": "Dr. KEVIN JOE",
//       "family": "JOE",
//       "given": [ "KEVIN" ]
//     } ],
//     "telecom": [ {
//       "system": "email",
//       "value": "tel:(781)555-1212"
//     } ],
//     "address": [ {
//       "type": "both",
//       "line": [ "123 MAIN STREET" ],
//       "city": "BROOKLYN",
//       "state": "NY",
//       "postalCode": "11233",
//       "country": "?"
//     } ],
//     "qualification": [ {
//       "identifier": [ {
//         "type": {
//           "text": "Hospital Doctor"
//         }
//       } ],
//       "code": {
//         "text": "Primary Physician"
//       }
//     } ]
//   },
//   "search": {
//     "mode": "match"
//   }
// }
// export * from './Practitioner';
