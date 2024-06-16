import useSWRMutation from 'swr/mutation';
import { UserType } from '@/store/user/types.ts';
import { API_URL } from '@/store/config.ts';

export type RegisterUserInput = UserType & { password: string };

async function registerUser(url: string, { arg }: { arg: RegisterUserInput }) {
  return await fetch(API_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arg)
  });
}

export function useRegister() {
  return useSWRMutation('/users/register/', registerUser, {});
}
