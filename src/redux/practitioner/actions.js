import axios from 'axios';
import * as Constants from './constants';

const parseServerData = (resource) => ({
    id: resource.id,
    firstName: resource?.name?.length ? resource?.name[0]?.given?.join(' ') : null,
    lastName: resource?.name?.length ? resource?.name[0]?.family : null,
    address: resource?.address?.map(address => address.text) || null,
    phone: resource?.telecom?.filter(dataCom => dataCom.system === 'phone')[0]?.value || null,
    fax: resource?.telecom?.filter(dataCom => dataCom.system === 'fax')[0]?.value || null,
    email: resource?.telecom?.filter(dataCom => dataCom.system === 'email')[0]?.value || null
  });

export const fetchPractitioners = (dispatch, url) => {
  const requestUrl = url || 'https://hapi.fhir.org/baseDstu3/Practitioner';

  dispatch({ type: Constants.FETCH_PRACTITIONERS_REQUEST });
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

    dispatch({ type: Constants.FETCH_PRACTITIONERS_SUCCESS, payload: { practitioners: practitioners, prevPageUrl, nextPageUrl }});
  }).catch(error => {
    dispatch({ type: Constants.FETCH_PRACTITIONERS_FAILURE, payload: { error }});
  });
};

export const updatePractitioner = (dispatch, practitioner) => {
  dispatch({ type: Constants.UPDATE_PRACTITIONER_REQUEST });

  const headers = {
    'Content-Type': 'application/fhir+json'
  };

  const payload = {
    "resourceType": "Practitioner",
    "id": practitioner.id,
    "identifier": [
      {
        "system": "http://fhir.de/NamingSystem/kbv/lanr",
        "value": practitioner.id
      }
    ],
    "name": [
      {
        "use": "usual",
        "family": practitioner.lastName,
        "given": practitioner.firstName,
        "prefix": ["Dr."]
      },
      {
        "_family": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/humanname-own-name",
              "valueString": "Test 3"
            }
          ]
        }
      }
    ],
    "telecom": [
      {
        "system": "phone",
        "value": practitioner.phone
      },
      {
        "system": "fax",
        "value": practitioner.fax
      },
      {
        "system": "email",
        "value": practitioner.email
      }
    ],
    "address": [
      {
        "text": practitioner.address
      }
    ]
  };

  axios.put(`https://hapi.fhir.org/baseDstu3/Practitioner/${practitioner.id}`, payload, { headers: headers })
    .then((res) => {
      dispatch({type: Constants.UPDATE_PRACTITIONER_SUCCESS, payload: practitioner});
    })
    .catch(error => {
      dispatch({type: Constants.UPDATE_PRACTITIONER_FAILURE, payload: { error }});
    });
};
