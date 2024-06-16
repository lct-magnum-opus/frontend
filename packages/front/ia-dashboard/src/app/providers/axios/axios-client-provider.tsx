import { Component, PropsWithChildren } from 'react';
import axios from 'axios';
import { AxiosClientContext } from './axios-client-context.ts';
import { AuthContext, AuthContextI } from '@/app/providers/auth';
import { API_URL } from '@/store/config.ts';

export class AxiosClientProvider extends Component<PropsWithChildren> {
  static contextType = AuthContext;
  declare context: AuthContextI;

  axiosClient = axios.create({
    baseURL: API_URL
  });

  constructor(props: PropsWithChildren, context: AuthContextI) {
    super(props, context);

    this.axiosClient.interceptors.request.use((config) => {
      config.headers = config.headers ?? {};

      const token = this.context.getToken();
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }

      config.headers.Accept = 'application/json';
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          if (this.context.isAuthenticated) {
            this.context.logout();
          }

          return Promise.reject(error);
        }

        if (error.code === 'ERR_CANCELED') {
          return;
        }

        console.error(error.message);

        return Promise.reject(error);
      }
    );
  }

  render() {
    return (
      <AxiosClientContext.Provider value={this.axiosClient}>
        {this.props.children}
      </AxiosClientContext.Provider>
    );
  }
}
