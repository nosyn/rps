'use client';

import PDFSample from '@/components/pdf-sample';
import { CornerDownLeft, Mic, Paperclip } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useChat } from 'ai/react';

export default function Dashboard() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className='grid flex-1 gap-4 overflow-auto p-4 grid-cols-1 md:grid-cols-2'>
      <div
        className='relative hidden flex-col items-start gap-8 md:flex bg-muted/50 overflow-auto max-h-[calc(100vh-8rem)] rounded-xl'
        x-chunk='dashboard-03-chunk-0'
      >
        <PDFSample />
      </div>
      <div className='relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4'>
        <Badge variant='outline' className='absolute right-3 top-3'>
          Output
        </Badge>

        <div className='flex-1'>
          {messages.length > 0
            ? messages.map((m: any) => (
                <div key={m.id} className='whitespace-pre-wrap'>
                  {m.role === 'user' ? 'User: ' : 'AI: '}
                  {m.content}
                </div>
              ))
            : null}
        </div>
        <form
          className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'
          x-chunk='dashboard-03-chunk-1'
          onSubmit={handleSubmit}
        >
          <Label htmlFor='message' className='sr-only'>
            Message
          </Label>
          <Textarea
            id='message'
            placeholder='Type your message here...'
            className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
            value={input}
            onChange={handleInputChange}
          />
          <div className='flex items-center p-3 pt-0'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Paperclip className='size-4' />
                  <span className='sr-only'>Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side='top'>Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Mic className='size-4' />
                  <span className='sr-only'>Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side='top'>Use Microphone</TooltipContent>
            </Tooltip>
            <Button type='submit' size='sm' className='ml-auto gap-1.5'>
              Send Message
              <CornerDownLeft className='size-3.5' />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
