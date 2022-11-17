import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { HapiPractitionersResponse } from '../types/Hapi.types';
import PractitionerFeed from './PractitionerFeed';
import { HapiPractitionersFetchRequestUrl } from '../constants';
import { AppContext } from '../AppContext';
import { NormalizedPractitioner } from '../utils/helpers';
import { CircularProgress } from '@mui/material';

function App() {
  const appContext = useContext(AppContext);
  const [practitioners, setPractitioners] = useState<NormalizedPractitioner[]>([]);

  useEffect(() => {
    if (!appContext?.state.fetched) {
      axios.get<HapiPractitionersResponse>(HapiPractitionersFetchRequestUrl)
        .then((res: AxiosResponse<HapiPractitionersResponse>) => {
          if (res.data.entry) {
            appContext?.dispatch({
              type: 'set-practitioners',
              payload: res.data.entry
            });
          }
        })
        .catch((err) => console.error(err));
    } else {
      setPractitioners(appContext.state.practitioners);
    }
  }, [appContext?.state.fetched])

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
          practitioners.length ?
            <PractitionerFeed
                practitioners={practitioners}
            />
          : <CircularProgress />
        }
      </main>
    </div>
  );
}

export default App;
