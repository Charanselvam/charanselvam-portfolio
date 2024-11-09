import {  Github, Instagram, Linkedin} from "lucide-react";
import HeaderNavLink from "./HeaderNavLink"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu"


const menuItems = [
  { icon: <Linkedin />, url: 'https://www.linkedin.com/in/charanselvam/' },
  { icon: <Github/>, url: 'https://github.com/Charanselvam' },
  { icon: <Instagram/>, url: 'https://www.instagram.com/charanselvam/' },
];

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="py-10 flex items-center justify-between">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-wrap gap-x-8 text-dark-600">
          {menuItems.map(({ url, icon }) => (
            <NavigationMenuItem key={url}>
              <HeaderNavLink href={url}>{icon}</HeaderNavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    </footer>
  )
}

export default Footer