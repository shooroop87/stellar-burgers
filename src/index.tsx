// точка входа в приложение
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import store from './services/store';

// инициализирую корень приложения
const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

// монтирую приложение
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
