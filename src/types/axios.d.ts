declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type AxiosResponse<T = any> = Promise<T>
}
