import { ComponentProps, ReactNode } from 'react';
import { cn } from '@/utils/utils.ts';

export interface MessageType {
  type: 'primary' | 'secondary';
  children?: ReactNode;
  questionId?: number;
  stale?: boolean;
}

export interface MessageProps extends Omit<ComponentProps<'div'>, 'ref'> {}

export function Messages({ children, className }: MessageProps) {
  return <div className={cn('space-y-2', className)}>{children}</div>;
}

export interface MessageProps extends Omit<ComponentProps<'div'>, 'ref'> {}

export function MessagePrimary({ children, className, ...props }: MessageProps) {
  return (
    <div
      className={cn('py-3 px-4 rounded-lg bg-muted w-fit ml-auto text-sm', className)}
      {...props}>
      {typeof children === 'string' ? (
        <p style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: children }} />
      ) : (
        children
      )}
    </div>
  );
}

export function MessageSecondary({ children, className, ...props }: MessageProps) {
  return (
    <div className={cn('py-3 px-4 rounded-lg border w-fit mr-auto text-sm max-w-full', className)} {...props}>
      {children}
    </div>
  );
}

export function Message({ type, content, questionId: _, stale: __, ...props }: MessageProps & MessageType) {
  return type === 'primary' ? <MessagePrimary {...props} /> : <MessageSecondary {...props} />;
}

Message.Primary = MessagePrimary;
Message.Secondary = MessageSecondary;
