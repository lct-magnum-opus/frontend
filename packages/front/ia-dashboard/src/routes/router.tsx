import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route
} from 'react-router-dom';
import {
  HOME_ROUTE,
  BUILDING_SESSION_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  TECHNOPARK_SESSION_ROUTE
} from '@/routes/routes.tsx';
import { SignInPage } from '@/routes/sign-in/sign-in-page.tsx';
import { BaseLayout } from '@/routes/_layouts/base-layout';
import { useAuth } from '@/app/providers/auth';
import { SignUpPage } from '@/routes/sign-up';
import { BuildingSessionPage } from 'routes/session';
import { NewSessionPage } from '@/routes/session/new-session-page.tsx';
import { TechnoparkSessionPage } from '@/routes/session/technopark-session-page.tsx';

function AuthGuard() {
  const { isAuthenticated, testMode } = useAuth();

  if (!isAuthenticated && !testMode) {
    return <Navigate to={SIGN_IN_ROUTE} replace />;
  }

  return <Outlet />;
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={SIGN_IN_ROUTE} Component={SignInPage} />
      <Route path={SIGN_UP_ROUTE} Component={SignUpPage} />

      <Route Component={AuthGuard}>
        <Route Component={BaseLayout}>
          <Route path={HOME_ROUTE} Component={NewSessionPage} />
          <Route path={BUILDING_SESSION_ROUTE} Component={BuildingSessionPage} />
          <Route path={TECHNOPARK_SESSION_ROUTE} Component={TechnoparkSessionPage} />
        </Route>
      </Route>

      <Route path={'*'} element={<Navigate to={'/'} replace />} />
    </Route>
  )
);
