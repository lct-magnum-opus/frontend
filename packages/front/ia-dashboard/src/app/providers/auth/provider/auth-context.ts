import { createContext } from 'react';

export interface AuthState {
  isAuthenticated: boolean;
  testMode?: boolean;
  loading: boolean;
  error?: Error | undefined;
}

export interface AuthContextI extends AuthState {
  login: (email: string, password: string) => Promise<true | undefined>;
  logout: () => void;
  getToken: () => string | null;
  enableTestMode: () => void;
}

export const AuthContext = createContext<AuthContextI | null>(null);
