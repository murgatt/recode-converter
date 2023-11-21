import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/NavigationMenu';
import { Tooltip } from '../ui/Tooltip';

type AppMenuItemProps = {
  children: React.ReactNode;
  label: string;
  to: string;
};

export const AppMenuItem = ({ children, label, to }: AppMenuItemProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  const linkClassName = cn(navigationMenuTriggerStyle({ className: 'px-3' }));

  return (
    <NavigationMenuItem>
      <Tooltip content={label} position="right">
        <NavigationMenuLink active={isActive} asChild className={linkClassName}>
          <Link aria-label={label} to={to}>
            {children}
          </Link>
        </NavigationMenuLink>
      </Tooltip>
    </NavigationMenuItem>
  );
};
