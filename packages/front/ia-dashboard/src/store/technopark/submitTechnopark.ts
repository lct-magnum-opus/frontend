import { AxiosInstance } from 'axios';
import useSWRMutation from 'swr/mutation';
import { useAxiosClient } from '@/app/providers/axios';
import { TechnoparkType } from '@/store/technopark/types.ts';
import {useSWRConfig} from 'swr';

export type SubmitTechnoparkInput = Pick<TechnoparkType, 'id'>;

export function submitTechnopark(axios: AxiosInstance, url: string, { id }: SubmitTechnoparkInput) {
  return axios.post(`${url}/${id}/submit/`).then((res) => res.data);
}

export function useSubmitTechnopark() {
  const axios = useAxiosClient();
  const { mutate } = useSWRConfig()

  return useSWRMutation('/chat/technopark', (url, { arg }: { arg: SubmitTechnoparkInput }) =>
    submitTechnopark(axios, url, arg),
    {
      onSuccess: () =>
        mutate((key) => typeof key === 'string' && key.startsWith('/chat/technopark'))
    }
  );
}
