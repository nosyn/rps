'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type SidebarItemProp = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export const SidebarItem = ({ href, icon, name }: SidebarItemProp) => {
  const pathname = usePathname();

  return (
    <Tooltip key={name}>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'rounded-lg',
            pathname === href && 'bg-muted'
          )}
          aria-label={name}
        >
          {icon}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {name}
      </TooltipContent>
    </Tooltip>
  );
};
