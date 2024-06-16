import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/app/providers/auth';
import { AxiosClientProvider } from '@/app/providers/axios';
import { router } from '@/routes/router.tsx';

const appTitle = 'Invest Advisor';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <AxiosClientProvider>
          <React.Fragment>
            <Helmet defaultTitle={appTitle} titleTemplate={`%s — ${appTitle}`} />
            <RouterProvider router={router} />
          </React.Fragment>
        </AxiosClientProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
