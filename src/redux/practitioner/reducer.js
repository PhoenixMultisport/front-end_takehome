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

    case CONSTANTS.UPDATE_PRACTITIONER_REQUEST:
      return { ...state, loading: true, error: null };
    case CONSTANTS.UPDATE_PRACTITIONER_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case CONSTANTS.UPDATE_PRACTITIONER_SUCCESS:
      return {
        ...state,
        practitioners: state.practitioners.map(item => item.id === action.payload.id ? action.payload : item),
        loading: false,
        error: null
      };

    default:
      return state
  }
};

export default practitionerReducer;
