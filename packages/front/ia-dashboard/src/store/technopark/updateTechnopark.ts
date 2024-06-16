import { AxiosInstance } from 'axios';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useAxiosClient } from '@/app/providers/axios';
import { TechnoparkType } from '@/store/technopark/types.ts';

export type UpdateTechnoparkInput = Pick<TechnoparkType, 'id'> & Partial<TechnoparkType>;

export function updateScheduleEntry(
  axios: AxiosInstance,
  url: string,
  { id, ...data }: UpdateTechnoparkInput
) {
  return axios.patch(`${url}/${id}`, data).then((res) => res.data);
}

export function useUpdateTechnopark() {
  const axios = useAxiosClient();
  const { mutate: _ } = useSWRConfig();

  return useSWRMutation(
    '/chat/technopark',
    (url, { arg }: { arg: UpdateTechnoparkInput }) => updateScheduleEntry(axios, url, arg)
    // {
    //   onSuccess: () =>
    //     mutate((key) => typeof key === 'string' && key.startsWith('/chat/technopark'))
    // }
  );
}
