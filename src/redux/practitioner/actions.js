import axios from 'axios';
import * as Types from './constants';

const parseServerData = (resource) => ({
    id: resource.id,
    firstName: resource?.name?.length ? resource?.name[0]?.given?.join(' ') : null,
    lastName: resource?.name?.length ? resource?.name[0]?.family : null,
    address: resource?.address?.map(address => address.text) || null,
    phone: resource?.telecom?.filter(dataCom => dataCom.system === 'phone').map(phone => phone.value) || null,
    fax: resource?.telecom?.filter(dataCom => dataCom.system === 'fax').map(fax => fax.value) || null,
    email: resource?.telecom?.filter(dataCom => dataCom.system === 'email').map(email => email.value) || null
  });

export const fetchPractitioners = (dispatch, url) => {
  const requestUrl = url || 'https://hapi.fhir.org/baseDstu3/Practitioner';

  dispatch({ type: Types.FETCH_PRACTITIONERS_REQUEST });
  axios.get(requestUrl).then((res) => {
    let practitioners = [];
    let nextPageUrl = null;
    let prevPageUrl = null;

    if (res.data && res.data.entry && res.data.entry.length > 0) {
      practitioners = res.data.entry.map(({ resource }) => parseServerData(resource));

      const nextPage = res.data.link.find(link => link.relation === 'next');
      nextPageUrl = nextPage ? nextPage.url : null;

      const previousPage = res.data.link.find(link => link.relation === 'previous');
      prevPageUrl = previousPage ? previousPage.url : null;
    }

    dispatch({ type: Types.FETCH_PRACTITIONERS_SUCCESS, payload: { practitioners: practitioners, prevPageUrl, nextPageUrl }});
  }).catch(error => {
    dispatch({ type: Types.FETCH_PRACTITIONERS_FAILURE, payload: { error }});
  });
};
