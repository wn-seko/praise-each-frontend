import axios, { AxiosRequestHeaders } from 'axios';

import { getActiveToken } from '~/domains/auth';

const client = axios.create({
  baseURL: `${API_HOST}`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

client.interceptors.request.use((request) => {
  const token = getActiveToken();
  const authorizationHeader = token ? { Authorization: `Bearer ${token}` } : {};
  request.headers = { ...request.headers, ...authorizationHeader } as AxiosRequestHeaders;
  return request;
});

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: unknown) => {
    return Promise.reject(error);
  },
);
export default client;
