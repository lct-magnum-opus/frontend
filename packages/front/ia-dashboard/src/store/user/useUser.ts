import { useFetcher } from '@/store/useFetcher.ts';
import useSWR from 'swr';
import { UserType } from '@/store/user/types.ts';
import {useAuth} from '@/app/providers/auth';

export function useUser() {
  const fetcher = useFetcher();
  const { testMode } = useAuth();

  return useSWR<UserType>(!testMode ? '/users/self/' : null, fetcher);
}
