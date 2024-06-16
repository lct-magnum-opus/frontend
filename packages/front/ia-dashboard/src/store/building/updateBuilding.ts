import { AxiosInstance } from 'axios';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useAxiosClient } from '@/app/providers/axios';
import { BuildingType } from '@/store/building/types.ts';

export type UpdateBuildingInput = Pick<BuildingType, 'id'> & Partial<BuildingType>;

export function updateScheduleEntry(
  axios: AxiosInstance,
  url: string,
  { id, ...data }: UpdateBuildingInput
) {
  return axios.patch(`${url}/${id}`, data).then((res) => res.data);
}

export function useUpdateBuilding() {
  const axios = useAxiosClient();
  const { mutate: _ } = useSWRConfig();

  return useSWRMutation(
    '/chat/building',
    (url, { arg }: { arg: UpdateBuildingInput }) => updateScheduleEntry(axios, url, arg)
    // {
    //   onSuccess: () =>
    //     mutate((key) => typeof key === 'string' && key.startsWith('/chat/technopark'))
    // }
  );
}
