import { AxiosInstance } from 'axios';
import { useAxiosClient } from '@/app/providers/axios';
import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';

export type CreateReportInput = {
  id?: string;
  name?: string;
};

export function createReport(axios: AxiosInstance, url: string, { id, name }: CreateReportInput) {
  return axios.post(`${url}/${id}/report/`, { name }).then((res) => res.data);
}

export function useCreateReport() {
  const axios = useAxiosClient();
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    '/chat',
    (url, { arg }: { arg: CreateReportInput }) => createReport(axios, url, arg),
    {
      onSuccess: () => mutate((key) => typeof key === 'string' && key.startsWith('/chat/'))
    }
  );
}
