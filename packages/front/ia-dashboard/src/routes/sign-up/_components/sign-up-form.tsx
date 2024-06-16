import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx';

export const signUpFormSchema = z.object({
  full_name: z.string({ required_error: 'Обязательное поле' }).min(3, 'Минимум 3 символа'),
  email: z.string({ required_error: 'Обязательное поле' }).email('Некорректный адрес эл. почты'),
  organization_name: z.string(),
  tax_number: z.string({ required_error: 'Обязательное поле' }).min(10, 'Минимум 10 символов'),
  website: z.string().optional(),
  industry: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  position: z.string().optional(),
  password: z.string({ required_error: 'Обязательное поле' }).min(8, 'Минимум 8 символов')
});

export interface SignUpFormProps {
  onSubmit: (values: z.infer<typeof signUpFormSchema>) => void;
  isLoading?: boolean;
  errors: {
    [key: string]: string[];
  } | null;
}

export function SignUpForm({ onSubmit, isLoading, errors }: SignUpFormProps) {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    shouldFocusError: true,
    defaultValues: {
      full_name: '',
      email: '',
      organization_name: '',
      tax_number: '',
      website: '',
      industry: '',
      country: 'Россия',
      city: '',
      position: '',
      password: ''
    }
  });

  useEffect(() => {
    if (errors) {
      for (const k in errors) {
        const key = k as keyof typeof errors;
        if (errors[key].length) {
          form.setError(key as keyof z.infer<typeof signUpFormSchema>, {
            message: errors[key][0]
          });
        }
      }
    } else {
      form.clearErrors();
    }
  }, [errors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name={'full_name'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ФИО *</FormLabel>
              <FormControl>
                <Input placeholder={'ФИО'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'email'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта *</FormLabel>
              <FormControl>
                <Input
                  type={'email'}
                  placeholder={'ivan.ivanov@example.com'}
                  autoComplete={'email'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'organization_name'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Наименование организации</FormLabel>
              <FormControl>
                <Input placeholder={'ООО "Рога и Копыта"'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'tax_number'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ИНН *</FormLabel>
              <FormControl>
                <Input placeholder={'ИНН'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'website'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Веб-сайт</FormLabel>
              <FormControl>
                <Input placeholder={'Веб-сайт'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'industry'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ОКВЭД</FormLabel>
              <FormControl>
                <Input placeholder={'ОКВЭД'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'country'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Страна</FormLabel>
              <Select
                defaultValue={String(field.value)}
                onValueChange={(value) => {
                  field.onChange(Number(value));
                }}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={'Выберите страну'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={'Россия'}>Россия</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'city'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Город</FormLabel>
              <FormControl>
                <Input placeholder={'Город'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'position'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Должность</FormLabel>
              <FormControl>
                <Input placeholder={'Должность'} {...field} />
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
              <FormLabel>Пароль *</FormLabel>
              <FormControl>
                <Input
                  type={'password'}
                  placeholder={'Пароль'}
                  autoComplete={'new-password'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={'w-full'} type="submit" disabled={isLoading}>
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
}
