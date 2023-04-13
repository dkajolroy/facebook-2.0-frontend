import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './Redux/Store';
import './index.css'
import './media.css'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('facebook_root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
