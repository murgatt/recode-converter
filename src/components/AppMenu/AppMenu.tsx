import { HelpCircleIcon, HomeIcon, SettingsIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavigationMenu, NavigationMenuList } from '../ui/NavigationMenu';
import { AppMenuItem } from './AppMenuItem';

export const AppMenu = () => {
  const { t } = useTranslation();

  return (
    <NavigationMenu className="border-border flex flex-col justify-between border-r px-2 py-3">
      <NavigationMenuList className="flex-col">
        <AppMenuItem label={t('appMenu.home')} to="/">
          <HomeIcon size="16" />
        </AppMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className="flex-col">
        <AppMenuItem label={t('appMenu.about')} to="/about">
          <HelpCircleIcon size="16" />
        </AppMenuItem>
        <AppMenuItem label={t('appMenu.settings')} to="/settings">
          <SettingsIcon size="16" />
        </AppMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
