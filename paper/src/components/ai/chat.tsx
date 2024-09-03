import { useChat } from '@ai-sdk/react';
import { Paperclip, Mic, CornerDownLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Badge } from '../ui/badge';

export const AIChat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
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
  );
};
