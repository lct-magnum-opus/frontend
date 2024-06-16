import { useContext } from 'react';
import { AuthContext } from '@/app/providers/auth/provider/auth-context.ts';
import { notNull } from '@/utils/notNull.ts';

export function useAuth() {
  const context = useContext(AuthContext);

  return notNull(context);
}
