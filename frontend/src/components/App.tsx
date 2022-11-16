import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { HapiPractitionerEntryItem, HapiPractitionersResponse } from '../types/Hapi.types';
import PractitionerFeed from './PractitionerFeed';

function App() {
  const [practitioners, setPractitioners] = useState<HapiPractitionerEntryItem[]>([]);

  useEffect(() => {
    axios.get<HapiPractitionersResponse>('http://hapi.fhir.org/baseDstu3/Practitioner')
      .then((res: AxiosResponse<HapiPractitionersResponse>) => setPractitioners(res.data.entry))
      .catch((err) => console.error(err));
  }, [])

  return (
    <div className="text-center">
      <header className="min-h-2 p-5 bg-sky-700 text-white font-bold pos drop-shadow-md">
        <nav>
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <h1>Frontend Assessment</h1>
          </div>
        </nav>
      </header>
      <main className="bg-sky-900 text-white min-h-screen flex flex-col items-center justify-center content-center p-5">
        {
          practitioners &&
            <PractitionerFeed
                practitioners={practitioners}
            />
        }
      </main>
    </div>
  );
}

export default App;
