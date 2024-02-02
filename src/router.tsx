import { trackEvent } from '@aptabase/electron/renderer';
import { createHashRouter } from 'react-router-dom';
import { App } from './App';
import { About } from './routes/About';
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
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

router.subscribe(state => trackEvent('page_view', { path: state.location.pathname }));
