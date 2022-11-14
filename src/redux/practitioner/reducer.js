import * as CONSTANTS from './constants';

const initState = {
  practitioners: [],
  prevPageUrl: null,
  nextPageUrl: null,
  loading: false,
  error: null
};


const practitionerReducer = (state = initState, action) => {
  switch (action.type) {
    case CONSTANTS.FETCH_PRACTITIONERS_REQUEST:
      return { ...state, loading: true, error: null };
    case CONSTANTS.FETCH_PRACTITIONERS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case CONSTANTS.FETCH_PRACTITIONERS_SUCCESS:
      return {
        ...state,
        practitioners: action.payload.practitioners,
        nextPage: action.payload.nextPageUrl,
        prevPage: action.payload.prevPageUrl,
        loading: false,
        error: null
      };
    default:
      return state
  }
};

export default practitionerReducer;
