import { AxiosInstance } from 'axios';
import { useAxiosClient } from '@/app/providers/axios';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { TechnoparkType } from '@/store/technopark/types.ts';

export type CreateTechnoparkInput = Partial<Omit<TechnoparkType, 'id'>>;

export function createTechnopark(
  axios: AxiosInstance,
  url: string,
  data: CreateTechnoparkInput
): Promise<TechnoparkType> {
  return axios.post(url, data).then((res) => res.data);
}

export function useCreateTechnopark() {
  const axios = useAxiosClient();
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    '/chat/technopark/',
    (url, { arg }: { arg: CreateTechnoparkInput }) => createTechnopark(axios, url, arg),
    {
      onSuccess: () => mutate((key) => typeof key === 'string' && key.startsWith('/chat/'))
    }
  );
}
