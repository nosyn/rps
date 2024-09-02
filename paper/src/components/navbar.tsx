import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  RocketIcon,
  MicroscopeIcon,
  PanelLeft,
  Settings,
  HomeIcon,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type NavLink = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const TopNavLinks: NavLink[] = [
  {
    href: '/',
    icon: HomeIcon,
    label: 'Dashboard',
  },
  {
    href: '/ai',
    icon: RocketIcon,
    label: 'AI Chat',
  },
];

export const MainNavbar = () => {
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Link
          href='/'
          className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
        >
          <MicroscopeIcon className='h-4 w-4 transition-all group-hover:scale-110' />
          <span className='sr-only'>Paper Inc</span>
        </Link>
        {TopNavLinks.map((NavLink) => (
          <Tooltip key={NavLink.href}>
            <TooltipTrigger asChild>
              <Link
                href={NavLink.href}
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <NavLink.icon className='h-5 w-5' />
                <span className='sr-only'>{NavLink.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>{NavLink.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
            >
              <Settings className='h-5 w-5' />
              <span className='sr-only'>Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='outline' className='sm:hidden'>
          <PanelLeft className='h-5 w-5' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='sm:max-w-xs'>
        <nav className='grid gap-6 text-lg font-medium'>
          <Link
            href='#'
            className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
          >
            <MicroscopeIcon className='h-5 w-5 transition-all group-hover:scale-110' />
            <span className='sr-only'>Paper Inc</span>
          </Link>

          {TopNavLinks.map((NavLink) => (
            <Link
              key={NavLink.href}
              href={NavLink.href}
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
            >
              <NavLink.icon className='h-5 w-5' />
              {NavLink.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
