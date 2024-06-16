import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthenticationError } from '@/app/providers/auth';
import { Button } from '@/components/ui/button.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';

export const signInFormSchema = z.object({
  email: z.string().email('Введен некорректный адрес'),
  password: z.string().min(1, 'Обязательное поле')
});

export interface SignInFormProps {
  onSubmit: (values: z.infer<typeof signInFormSchema>) => void;
  isLoading?: boolean;
  error?: Error;
}

export function SignInForm({ onSubmit, isLoading, error }: SignInFormProps) {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    if (error instanceof AuthenticationError) {
      form.setError('password', {
        message: 'Неверный пароль'
      });
    }
  }, [error]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name={'email'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input type={'email'} placeholder={'m@example.com'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'password'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type={'password'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={'w-full'} type="submit" disabled={isLoading}>
          Войти
        </Button>
      </form>
    </Form>
  );
}
