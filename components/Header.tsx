import React from 'react';
import HeaderNavLink from './HeaderNavLink';
import { Home, Briefcase, Folder } from 'lucide-react'; // Import Lucide icons
import { ModeToggle } from './ModeToggle';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from './ui/navigation-menu';

const menuItems = [
  { icon: <Home />, url: '/' },
  { icon: <Briefcase />, url: '/work' },
  { icon: <Folder />, url: '/projects' },
];

const Header: React.FC = () => (
  <header className="flex flex-col gap-5 inset-x-0 top-0 h-16 ...">
    <div className="py-4 flex items-center justify-between">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-wrap gap-x-8 text-dark-600">
          {menuItems.map(({ url, icon }) => (
            <NavigationMenuItem key={url}>
              <HeaderNavLink href={url}>{icon}</HeaderNavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <ModeToggle />
    </div>
  </header>
);

export default React.memo(Header);