'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { TooltipProvider } from './ui/tooltip';
import { ClerkProvider } from '@clerk/nextjs';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ClerkProvider>
      <NextThemesProvider {...props}>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </NextThemesProvider>
    </ClerkProvider>
  );
}
