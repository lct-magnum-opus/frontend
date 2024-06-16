import { useFetcher } from '@/store/useFetcher.ts';
import useSWRImmutable from 'swr/immutable';
import { SharedOptions } from '@/store/types.ts';

export interface GetTechnoparkOptionsInput {
  id?: string;
  question?: number;
}

export function useTechnoparkOptions(props: GetTechnoparkOptionsInput) {
  const fetcher = useFetcher();

  return useSWRImmutable<SharedOptions>(
    props.id && props.question
      ? `/chat/technopark/${props.id}/question/${props.question}/options/`
      : null,
    fetcher
  );
}
