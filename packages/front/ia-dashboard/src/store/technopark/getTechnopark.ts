import { useFetcher } from '@/store/useFetcher.ts';
import { TechnoparkType } from '@/store/technopark/types.ts';
import useSWRImmutable from 'swr/immutable';

export interface GetTechnoparkInput {
  id?: string;
}

export function useTechnopark(props: GetTechnoparkInput) {
  const fetcher = useFetcher();

  return useSWRImmutable<TechnoparkType>(
    props.id ? `/chat/technopark/${props.id}` : null,
    fetcher,
  );
}
