import axios from 'axios';
import { HapiPractitionersResponse } from '../types/Hapi.types';
import { HapiPractitionersFetchRequestUrl } from '../constants';

export const HapiService = {
  fetchPractitioners: async (searchTerm?: string) => {
    let searchUrl = HapiPractitionersFetchRequestUrl;

    try {
      if (searchTerm) {
        searchUrl = `${HapiPractitionersFetchRequestUrl}/?given=${searchTerm}&_format=json&_pretty=true`;
      }

      const result = await axios.get<HapiPractitionersResponse>(searchUrl);

      if (result.data.entry) {
        console.log('result.data.entry', result.data.entry);
        return result.data;
      }
    } catch (err) {
      console.error(err);
    }
  }
}
