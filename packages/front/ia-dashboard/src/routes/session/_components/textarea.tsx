import { ChangeEvent, ComponentProps, KeyboardEvent, useRef } from 'react';
import { cn } from '@/utils/utils.ts';

export interface TextAreaProps extends Omit<ComponentProps<'textarea'>, 'ref'> {
  onSubmitEnter?: () => void;
}

export function TextArea({
  className,
  onSubmitEnter,
  onChange: onChangeProp,
  ...props
}: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    if (ref.current) {
      ref.current.innerHTML = ref.current.value;
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current?.scrollHeight ?? 40}px`;
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    resize();
    onChangeProp?.(e);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmitEnter?.();
      resize();
      return;
    }
  };

  return (
    <div className={cn('flex min-w-0 flex-1 flex-col', className)}>
      <textarea
        className={
          'm-0 pr-0 pl-2 py-2 bg-transparent border-0 resize-none outline-none max-h-[25dvh]'
        }
        style={{
          overflowY: 'hidden',
          minHeight: 40
        }}
        rows={1}
        placeholder={'Введите сообщение'}
        ref={ref}
        onChange={onChange}
        onKeyDown={onKeyDown}
        {...props}
      />
    </div>
  );
}
