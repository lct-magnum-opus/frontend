export type SessionFormSubmitValue = string | string[] | number | number[] | boolean | null;

export type SessionFormVariant = 'text' | 'boolean' | 'slider' | 'select';

export interface SessionFormProps {
  className?: string;
  onSubmit?: (value: SessionFormSubmitValue) => void;
  loading?: boolean;
}
