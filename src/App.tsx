import { HomeIcon, SettingsIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './components/ui/NavigationMenu';

export const App = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen">
      <NavigationMenu className="border-r border-border p-2">
        <NavigationMenuList className="flex-col">
          <NavigationMenuItem>
            <NavigationMenuLink active asChild className={navigationMenuTriggerStyle()}>
              <Link to="/">
                <HomeIcon size="16" />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/settings">
                <SettingsIcon size="16" />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <main>
        <h1>{t('helloWorld')}</h1>
      </main>
    </div>
  );
};
