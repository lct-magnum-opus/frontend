import { useFetcher } from '@/store/useFetcher.ts';
import useSWRImmutable from 'swr/immutable';
import {BuildingType} from '@/store/building/types.ts';

export interface GetBuildingInput {
  id?: string;
}

export function useBuilding(props: GetBuildingInput) {
  const fetcher = useFetcher();

  return useSWRImmutable<BuildingType>(
    props.id ? `/chat/building/${props.id}` : null,
    fetcher,
  );
}
