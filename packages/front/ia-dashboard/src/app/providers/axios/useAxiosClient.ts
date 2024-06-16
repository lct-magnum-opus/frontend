import { useContext } from 'react';
import { AxiosClientContext } from './axios-client-context.ts';
import { notNull } from '@/utils/notNull.ts';

export function useAxiosClient() {
  const axiosClient = useContext(AxiosClientContext);

  return notNull(axiosClient);
}
