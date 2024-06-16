import { useFetcher } from '@/store/useFetcher.ts';
import useSWRImmutable from 'swr/immutable';
import {SharedOptions} from '@/store/types.ts';

export interface GetBuildingOptionsInput {
  id?: string;
  question?: number;
}

export function useBuildingOptions(props: GetBuildingOptionsInput) {
  const fetcher = useFetcher();

  return useSWRImmutable<SharedOptions>(
    props.id && props.question
      ? `/chat/building/${props.id}/question/${props.question}/options/`
      : null,
    fetcher
  );
}
