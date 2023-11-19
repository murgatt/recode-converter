import { Outlet } from 'react-router-dom';
import { AppMenu } from './components/AppMenu';
import { useTheme } from './hooks/useTheme';

export const App = () => {
  useTheme();

  return (
    <div className="flex h-screen">
      <AppMenu />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};
