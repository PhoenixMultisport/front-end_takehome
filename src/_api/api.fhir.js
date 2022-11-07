const config = {
  api: "http://hapi.fhir.org/baseDstu3/Practitioner",
  options: {
    headers: { "content-type": "application/json" },
  },
  optionsUpdate: {
    headers: { "content-type": "application/fhir+json" },
  },
};

const httpGet = async(query) => {
  let url = config.api;

  if (query) {
    url = url + "/" + query;
  }

  return fetch(`${url}`, {
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const httpGetFromUrl = (url) => {
  return fetch(`${url}`, {
    ...config.options,
  })
  .then((response) => handleResponse(response))
  .then((response) => response)
  .catch((error) => {
    console.error(error);
    throw Error(error);
  });
};

const httpPost = (data) => {
  return fetch(`${config.api}`, {
    method: 'post',
    body: data ? JSON.stringify(data) : null,
    ...config.optionsUpdate,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const handleResponse = (response) => {
  if (response.status === 200) {
    return response.json();
  }
  else if (response.status === 201) {
    return 201;
  }
  else {
    const error = Error(response.json() | 'error');

    //log the error
    console.log(error);

    //throw it
    throw error;
  }
};

export default { httpGet, httpGetFromUrl, httpPost };