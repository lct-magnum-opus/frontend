import { AxiosInstance } from 'axios';
import useSWRMutation from 'swr/mutation';
import { useAxiosClient } from '@/app/providers/axios';
import { useSWRConfig } from 'swr';
import { BuildingType } from '@/store/building/types.ts';

export type SubmitBuildingInput = Pick<BuildingType, 'id'>;

export function submitBuilding(axios: AxiosInstance, url: string, { id }: SubmitBuildingInput) {
  return axios.post(`${url}/${id}/submit/`).then((res) => res.data);
}

export function useSubmitBuilding() {
  const axios = useAxiosClient();
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    '/chat/building',
    (url, { arg }: { arg: SubmitBuildingInput }) => submitBuilding(axios, url, arg),
    {
      onSuccess: () => mutate((key) => typeof key === 'string' && key.startsWith('/chat/building'))
    }
  );
}
