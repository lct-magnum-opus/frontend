import { AxiosInstance } from 'axios';
import { useAxiosClient } from '@/app/providers/axios';
import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';

export type CreateMessageInput = {
  id?: string;
  text: string;
};

export function createMessage(axios: AxiosInstance, url: string, { id, text }: CreateMessageInput) {
  return axios.post(`${url}/${id}/messages/`, { text }).then((res) => res.data);
}

export function useCreateMessage() {
  const axios = useAxiosClient();
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    '/chat',
    (url, { arg }: { arg: CreateMessageInput }) => createMessage(axios, url, arg),
    {
      onSuccess: () => mutate((key) => typeof key === 'string' && key.startsWith('/chat/'))
    }
  );
}
