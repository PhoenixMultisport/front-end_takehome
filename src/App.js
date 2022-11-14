import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppRouter from './router';

import 'antd/dist/antd.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
