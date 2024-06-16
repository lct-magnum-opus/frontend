import { SessionFormProps } from '@/routes/session/_components/form/types.ts';
import { FormLayout } from '@/routes/session/_components/form-layout.tsx';
import { cn } from '@/utils/utils.ts';
import Select, { Props } from 'react-select';
import { useState } from 'react';

export function FormSelect({
  className,
  onSubmit,
  loading,
  ...props
}: SessionFormProps & Omit<Props, 'value' | 'onChange'>) {
  const [value, setValue] = useState<any | undefined>(undefined);

  return (
    <FormLayout
      className={cn(className)}
      button={{
        onClick: () =>
          onSubmit?.(
            value ? (Array.isArray(value) ? value.map((i) => i.value) : value.value) : null
          ),
        disabled: loading
      }}>
      <Select
        menuPlacement={'top'}
        placeholder={props.isMulti ? 'Выберите значения' : 'Выберите значение'}
        noOptionsMessage={() => 'Нет доступных значений'}
        value={value}
        onChange={(value) => setValue(value as string | string[])}
        {...props}
      />
    </FormLayout>
  );
}
