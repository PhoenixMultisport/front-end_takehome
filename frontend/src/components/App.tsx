import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { HapiPractitionersResponse } from '../types/Hapi.types';
import PractitionerFeed from './PractitionerFeed';
import { HapiPractitionersFetchRequestUrl } from '../constants';
import { AppContext } from '../AppContext';
import { NormalizedPractitioner } from '../utils/helpers';
import { Input, Button, CircularProgress } from '@mui/material';

function App() {
  const appContext = useContext(AppContext);
  const [practitioners, setPractitioners] = useState<NormalizedPractitioner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect( () => {
    let searchUrl = HapiPractitionersFetchRequestUrl;

    if (!appContext?.state.fetched || searchTerm.length === 0) {
      axios.get<HapiPractitionersResponse>(searchUrl)
        .then((res: AxiosResponse<HapiPractitionersResponse>) => {
          if (res.data.entry) {
            appContext?.dispatch({
              type: 'set-practitioners',
              payload: res.data
            });
          }
        })
        .catch((err) => console.error(err));
    } else {
      setPractitioners(appContext.state.practitioners);
    }

    if (searchTerm.length > 0) {
      searchUrl = `${HapiPractitionersFetchRequestUrl}/?given=${searchTerm}&_format=json&_pretty=true`;

      axios.get<HapiPractitionersResponse>(searchUrl)
        .then((res: AxiosResponse<HapiPractitionersResponse>) => {
          if (res.data.entry) {
            appContext?.dispatch({
              type: 'set-practitioners',
              payload: res.data
            });
          }
        })
        .catch((err) => console.error(err));
    }
  }, [appContext?.state.fetched, searchTerm]);

  const getPreviousPage = () => {
    axios.get<HapiPractitionersResponse>(appContext?.state.previousPage as string)
      .then((res: AxiosResponse<HapiPractitionersResponse>) => {
        if (res.data.entry) {
          appContext?.dispatch({
            type: 'set-practitioners',
            payload: res.data
          });
        }
      })
      .catch((err) => console.error(err));
  }

  const getNextPage = () => {
    axios.get<HapiPractitionersResponse>(appContext?.state.nextPage as string)
      .then((res: AxiosResponse<HapiPractitionersResponse>) => {
        if (res.data.entry) {
          appContext?.dispatch({
            type: 'set-practitioners',
            payload: res.data
          });
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="text-center">
      <header className="min-h-2 p-5 bg-sky-700 text-white font-bold pos drop-shadow-md">
        <nav>
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <h1>Frontend Assessment</h1>
            <Input
              classes={{ inputTypeSearch: 'search'}}
              onChange={(ev) => setSearchTerm(ev.target.value)}
            />
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
        <div className="flex">
        <Button
          disabled={!appContext?.state.previousPage}
          onClick={() => getPreviousPage()}
        >
          Previous Page
        </Button>
        <Button
          disabled={!appContext?.state.nextPage}
          onClick={() => getNextPage()}
        >
          Next Page
        </Button>
        </div>
      </main>
    </div>
  );
}

export default App;
