import { useAxiosClient } from '@/app/providers/axios';

export function useMutator<T>(method: string) {
  const axios = useAxiosClient();

  return (url: string, { arg: data }: { arg: T | undefined }) => {
    return axios({
      method,
      url,
      data
    }).then((response) => response.data);
  };
}
