import { AxiosInstance } from 'axios';
import { useAxiosClient } from '@/app/providers/axios';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { BuildingType } from '@/store/building/types.ts';

export type CreateBuildingInput = Partial<Omit<BuildingType, 'id'>>;

export function createBuilding(
  axios: AxiosInstance,
  url: string,
  data: CreateBuildingInput
): Promise<BuildingType> {
  return axios.post(url, data).then((res) => res.data);
}

export function useCreateBuilding() {
  const axios = useAxiosClient();
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    '/chat/building/',
    (url, { arg }: { arg: CreateBuildingInput }) => createBuilding(axios, url, arg),
    {
      onSuccess: () => mutate((key) => typeof key === 'string' && key.startsWith('/chat/'))
    }
  );
}
