import { SessionFormProps } from '@/routes/session/_components/form/types.ts';
import { FormLayout } from '@/routes/session/_components/form-layout.tsx';
import { cn } from '@/utils/utils.ts';
import { TextArea } from '@/routes/session/_components/textarea.tsx';
import { useState } from 'react';

export function FormText({ className, onSubmit: onSubmitProp, loading }: SessionFormProps) {
  const [value, setValue] = useState('');

  const onSubmit = () => {
    if (loading) return;
    onSubmitProp?.(value);
    setValue('');
  };

  return (
    <FormLayout
      className={cn(className)}
      button={{
        onClick: onSubmit,
        disabled: loading,
        loading
      }}>
      <TextArea value={value} onChange={(e) => setValue(e.target.value)} onSubmitEnter={onSubmit} />
    </FormLayout>
  );
}
