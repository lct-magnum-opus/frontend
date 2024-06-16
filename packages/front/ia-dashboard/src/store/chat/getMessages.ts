import { useFetcher } from '@/store/useFetcher.ts';
import useSWRImmutable from 'swr/immutable';
import { SWRConfiguration } from 'swr/';
import {ChatMessageType} from '@/store/chat/types.ts';

export interface GetMessagesInput extends Pick<SWRConfiguration, 'refreshInterval'> {
  id?: string;
  submitted?: boolean;
}

export function useMessages({ refreshInterval, ...props }: GetMessagesInput) {
  const fetcher = useFetcher();

  return useSWRImmutable<ChatMessageType[]>(props.id ? `/chat/${props.id}/messages/` : null, fetcher, {
    refreshInterval,
  });
}
