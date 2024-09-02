import { ThemeProvider } from '@/components/providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { MainNavbar } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Paper',
  description: 'Next Generation of Writing Paper Research with AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex min-h-screen w-full flex-col bg-muted/40'>
            <MainNavbar />
            <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
              <Header />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
