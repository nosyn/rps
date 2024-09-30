'use client';

import dynamic from 'next/dynamic';
import { AIChat } from '@/components/ai/chat';
const PDFViewer = dynamic(
  () => import('@/components/pdf/pdf-viewer').then((res) => res.PDFViewer),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  return (
    <main className='grid flex-1 gap-4 overflow-auto p-4 grid-cols-1 lg:grid-cols-2'>
      <div
        className='relative items-start gap-8 bg-muted/50 overflow-auto rounded-xl max-h-[calc(100vh-6rem)] p-4'
        x-chunk='dashboard-03-chunk-0'
      >
        <PDFViewer />
      </div>
      <div>
        <AIChat />
      </div>
    </main>
  );
}
