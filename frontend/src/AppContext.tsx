import React, { createContext, Dispatch, useReducer } from 'react';
import {
  getLinkUrls,
  NormalizedPractitioner,
  normalizeFetchedPractitioners,
  normalizePractitionerResult
} from './utils/helpers';

export interface IAppContextData {
  practitioners: NormalizedPractitioner[];
  previousPage: string | null,
  nextPage: string | null,
  fetched: boolean;
}

interface IAppContext {
  state: IAppContextData;
  dispatch: Dispatch<any>
}

let initialState: IAppContextData = {
  practitioners: [],
  previousPage: null,
  nextPage: null,
  fetched: false,
}

const AppContext = createContext<IAppContext | null>(null);

let reducer = (state, action) => {
  switch(action.type) {
    case 'set-practitioners':
      const { previousPage, nextPage } = getLinkUrls(action.payload);

      return {
        practitioners: normalizeFetchedPractitioners(action.payload.entry),
        previousPage,
        nextPage,
        fetched: true,
      }
    case 'update-practitioners':
      const editedPractitioner = normalizePractitionerResult(action.payload);
      const statePractitioners = state.practitioners;
      const editedPractitionerIndex = statePractitioners.findIndex((p) => p.id === editedPractitioner.id);
      statePractitioners[editedPractitionerIndex] = editedPractitioner;

      return {
        ...state,
        statePractitioners,
      }
  }
}

const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>
      { props.children }
    </AppContext.Provider>
  );
};

let AppContextConsumer = AppContext.Consumer;

export {AppContext, AppContextProvider, AppContextConsumer};
