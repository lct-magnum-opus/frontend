import { Link, Navigate } from 'react-router-dom';
import { z } from 'zod';
import { SignInForm, signInFormSchema } from './_components/sign-in-form.tsx';
import { useAuth } from '@/app/providers/auth';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button.tsx';
import { SIGN_UP_ROUTE } from '@/routes/routes.tsx';

export function SignInPage() {
  const { login, isAuthenticated, testMode, loading, error, enableTestMode } = useAuth();

  const onSubmit = async ({ email, password }: z.infer<typeof signInFormSchema>) => {
    await login(email, password);
  };

  if (isAuthenticated || testMode) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <div className={'min-h-screen flex justify-center items-center'}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Авторизация</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          <SignInForm onSubmit={onSubmit} isLoading={loading} error={error} />
        </CardContent>

        <CardFooter className="flex flex-col gap-2 items-start">
          <Button className={'w-fit h-fit p-0 mb-2'} variant="link" size={'sm'} asChild>
            <Link to={SIGN_UP_ROUTE}>Регистрация</Link>
          </Button>

          <Button className={'w-fit h-fit p-0 mb-2'} variant="link" size={'sm'} onClick={() => enableTestMode()}>
            Продолжить без регистрации
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
