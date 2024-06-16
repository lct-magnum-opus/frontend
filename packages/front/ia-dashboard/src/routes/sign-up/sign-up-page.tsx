import { useAuth } from '@/app/providers/auth';
import { z } from 'zod';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { SignUpForm, signUpFormSchema } from './_components/sign-up-form.tsx';
import { useRegister } from '@/store/user/useRegister.ts';
import { SIGN_IN_ROUTE } from '@/routes/routes.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';

export function SignUpPage() {
  const { isAuthenticated } = useAuth();
  const { trigger, isMutating } = useRegister();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const onSubmit = async (data: z.infer<typeof signUpFormSchema>) => {
    setErrors(null);

    const input: Partial<typeof data> = {};
    for (const k in data) {
      const key = k as keyof typeof data;
      if (data[key]) {
        input[key] = data[key];
      }
    }

    const response = await trigger(input as typeof data);

    if (response.ok) {
      navigate(SIGN_IN_ROUTE);
    } else {
      const data = await response.json();
      setErrors(data);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <div className={'min-h-screen flex justify-center items-center py-[40px]'}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Регистрация</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          <SignUpForm onSubmit={onSubmit} isLoading={isMutating} errors={errors} />
        </CardContent>

        <CardFooter>
          <Button className={'w-fit h-fit p-0 mb-2'} variant="link" size={'sm'} asChild>
            <Link to={SIGN_IN_ROUTE}>Авторизация</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
