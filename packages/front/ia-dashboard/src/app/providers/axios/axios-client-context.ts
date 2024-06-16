import { createContext } from 'react';
import { AxiosInstance } from 'axios';

export const AxiosClientContext = createContext<AxiosInstance | null>(null);
