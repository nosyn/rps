import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Home, MicroscopeIcon, PanelLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { MobileNavbar } from './navbar';

export const Header = () => {
  return (
    <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
      <MobileNavbar />
      <div className='relative ml-auto flex-1 md:grow-0'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='Search...'
          className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
        />
      </div>
      <ModeToggle />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};
