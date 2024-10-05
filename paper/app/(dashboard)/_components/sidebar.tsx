import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Book, Bot, Code2, LifeBuoy, Settings2, SquareCodeIcon, SquareUser, Triangle } from 'lucide-react';

import { SidebarItem, type SidebarItemProp } from './nav-item';

const NavItems: SidebarItemProp[] = [
  {
    name: 'Playground',
    icon: <SquareCodeIcon className="size-5" />,
    href: '/',
  },
  {
    name: 'Models',
    icon: <Bot className="size-5" />,
    href: '#',
  },
  {
    name: 'API',
    icon: <Code2 className="size-5" />,
    href: '#',
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
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Help">
              <LifeBuoy className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Help
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Account">
              <SquareUser className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Account
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};
