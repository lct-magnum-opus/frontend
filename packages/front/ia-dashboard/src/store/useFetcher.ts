import { useAxiosClient } from '@/app/providers/axios';

export function useFetcher() {
  const axios = useAxiosClient();

  return (url: string) => axios.get(url).then((response) => response.data);
}
