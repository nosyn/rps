'use client';

import { AIChat } from '@/components/ai/chat';
import { PDFViewer } from '@/components/pdf/pdf-viewer';
import { useChat } from 'ai/react';

export default function Dashboard() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

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
