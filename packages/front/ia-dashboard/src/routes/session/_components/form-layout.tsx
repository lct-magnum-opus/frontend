import { Button } from '@/components/ui/button.tsx';
import { Loader2, Send } from 'lucide-react';
import { ComponentProps } from 'react';
import { cn } from '@/utils/utils.ts';
import {omit} from 'lodash-es';

export interface FormLayoutProps extends Omit<ComponentProps<'div'>, 'ref'> {
  button?: (Omit<ComponentProps<'button'>, 'ref'> & { loading?: boolean }) | false;
  classes?: {
    content?: string;
  };
}

export function FormLayout({ children, className, classes, button, ...props }: FormLayoutProps) {
  return (
    <div
      className={cn(
        'flex items-end gap-2 min-h-[56px] p-2 rounded-lg shadow-[0_1px_5px_0_rgba(0,0,0,0.15)]',
        className
      )}
      {...props}>
      <div className={cn('flex-1', classes?.content)}>{children}</div>

      {button !== false && (
        <Button className="rounded-lg" variant="default" size="icon" {...omit(button, 'loading')}>
          {button?.loading ? (
            <Loader2 className="h-4 w-4 mx-auto animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
}
