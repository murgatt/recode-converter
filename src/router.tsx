import { createHashRouter } from 'react-router-dom';
import { App } from './App';
import { Converter } from './routes/Converter';
import { Settings } from './routes/Settings';

export const router = createHashRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Converter />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]);
