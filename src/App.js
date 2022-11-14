import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './redux/store';
import AppRouter from './router';

import 'react-toastify/dist/ReactToastify.min.css';
import 'antd/dist/antd.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <AppRouter />
    </Provider>
  );
}

export default App;
