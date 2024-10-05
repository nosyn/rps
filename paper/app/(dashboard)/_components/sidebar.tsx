import { Button } from '@/components/ui/button';
import { Book, Settings2, SquareCodeIcon, Triangle } from 'lucide-react';

import { SidebarItem, type SidebarItemProp } from './sidebar-item';

const NavItems: SidebarItemProp[] = [
  {
    name: 'Playground',
    icon: <SquareCodeIcon className="size-5" />,
    href: '/',
  },
  {
    name: 'References',
    icon: <Book className="size-5" />,
    href: '/references',
  },
  {
    name: 'Settings',
    icon: <Settings2 className="size-5" />,
    href: '#',
  },
];

export const SideBar = () => {
  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        {NavItems.map((navItem) => (
          <SidebarItem {...navItem} key={navItem.href} />
        ))}
      </nav>
    </aside>
  );
};
