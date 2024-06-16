import { SessionFormProps } from '@/routes/session/_components/form/types.ts';
import { FormLayout } from '@/routes/session/_components/form-layout.tsx';
import { cn } from '@/utils/utils.ts';
import { Button } from '@/components/ui/button.tsx';

export interface FormBooleanProps extends SessionFormProps {
  buttons?: {
    yes: string;
    no: string;
  };
}

export function FormBoolean({
  className,
  onSubmit,
  loading,
  buttons = { yes: 'Да', no: 'Нет' }
}: FormBooleanProps) {
  return (
    <FormLayout
      className={cn(className)}
      classes={{ content: 'flex flex-col-reverse flex-wrap md:flex-row gap-1' }}
      button={false}>
      <Button
        className="flex-1"
        onClick={() => onSubmit?.(false)}
        variant={'secondary'}
        disabled={loading}>
        {buttons?.no ?? 'Нет'}
      </Button>
      <Button className="flex-1" onClick={() => onSubmit?.(true)} disabled={loading}>
        {buttons?.yes ?? 'Да'}
      </Button>
    </FormLayout>
  );
}
