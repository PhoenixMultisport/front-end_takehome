import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import PractitionerFeedListItem from './PractitionerFeedListItem';
import { HapiPractitionerEntryItem, HapiPractitionersResponse } from '../types/Hapi.types';
import { getPractitionerEmail } from '../utils/helpers';

function App() {
  const [practitioners, setPractitioners] = useState<HapiPractitionerEntryItem[]>([]);

  useEffect(() => {
    axios.get<HapiPractitionersResponse>('http://hapi.fhir.org/baseDstu3/Practitioner')
      .then((res: AxiosResponse<HapiPractitionersResponse>) => setPractitioners(res.data.entry))
      .catch((err) => console.error(err));
  }, [])

  return (
    <div className="text-center">
      <header>
      </header>
      <main className="bg-sky-900 text-white min-h-screen flex flex-col items-center justify-center content-center">
        <ul>
          {
            practitioners.map((p: HapiPractitionerEntryItem, i: number) => {
              const practitionerEmail: string = getPractitionerEmail(p.resource.telecom);

              return (
                <PractitionerFeedListItem
                  key={i}
                  itemKey={p.resource.id}
                  resourceType={p.resource.resourceType}
                  email={practitionerEmail}
                  url={p.fullUrl}
                />
              )
            })
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
