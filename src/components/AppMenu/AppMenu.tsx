import { HomeIcon, SettingsIcon } from 'lucide-react';
import { NavigationMenu, NavigationMenuList } from '../ui/NavigationMenu';
import { AppMenuItem } from './AppMenuItem';

export const AppMenu = () => {
  return (
    <NavigationMenu className="flex flex-col justify-between border-r border-border px-2 py-3">
      <NavigationMenuList className="flex-col">
        <AppMenuItem to="/">
          <HomeIcon size="16" />
        </AppMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className="flex-col">
        <AppMenuItem to="/settings">
          <SettingsIcon size="16" />
        </AppMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
