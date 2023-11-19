import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/NavigationMenu';

type AppMenuItemProps = {
  children: React.ReactNode;
  to: string;
};

export const AppMenuItem = ({ children, to }: AppMenuItemProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  const linkClassName = cn(navigationMenuTriggerStyle({ className: 'px-3' }));

  return (
    <NavigationMenuItem>
      <NavigationMenuLink active={isActive} asChild className={linkClassName}>
        <Link to={to}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
