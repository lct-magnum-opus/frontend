import { useFetcher } from '@/store/useFetcher.ts';
import useSWR from 'swr';
import { ChatType } from '@/store/chat/types.ts';

export function useChats() {
  const fetcher = useFetcher();

  return useSWR<ChatType[]>(`/chat/`, fetcher);
}
