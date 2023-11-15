import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './i18n';
import './index.css';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// Remove Preload scripts loading
// postMessage({ payload: 'removeLoading' }, '*');

// Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
//   console.log(message);
// });
