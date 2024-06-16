import { PropsWithChildren, useCallback, useRef } from 'react';
import { useSetState } from '@/app/providers/auth/provider/_internal/state.ts';
import { AuthContext, AuthState } from '@/app/providers/auth/provider/auth-context.ts';
import { AuthService } from '@/app/providers/auth/service/auth-service.ts';

export const AuthProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const serviceRef = useRef<AuthService>(new AuthService());
  const service = serviceRef.current;

  const [state, setState] = useSetState<AuthState>(() => {
    const entry = service.getEntry();

    return {
      isAuthenticated: !!entry,
      loading: false,
      error: undefined,
      testMode: false,
    };
  });

  const login = useCallback(async (email: string, password: string) => {
    try {
      setState({ loading: true, isAuthenticated: false, error: undefined });
      const data = await service.login(email, password);
      setState({
        loading: false,
        isAuthenticated: !!data,
      });
      return true;
    } catch (error: any) {
      setState({ loading: false, isAuthenticated: false, error });
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setState({ loading: true, error: undefined });
      await service.logout();
    } finally {
      setState({ loading: false, isAuthenticated: false, testMode: false, error: undefined });
    }
  }, []);

  const enableTestMode = useCallback(async () => {
    setState({ loading: false, isAuthenticated: false, testMode: true, error: undefined });
  }, []);

  const getToken = useCallback(() => {
    try {
      const entry = service.getEntry();
      return entry?.body.token || null;
    } catch (e) {
      return null;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        testMode: state.testMode,
        login,
        logout,
        getToken,
        enableTestMode
      }}>
      {children}
    </AuthContext.Provider>
  );
};
