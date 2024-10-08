import { Share } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SideBar } from './_components/sidebar';
import { UserNav } from '../components/user-nav';

export const description =
  'An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen w-full pl-[53px]">
      <SideBar />
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Playground</h1>
          <div className="ml-auto">
            <UserNav />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
