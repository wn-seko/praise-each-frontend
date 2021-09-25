import api from './api'

export interface Praise {
  from: string
  to: string
  createdAt: string
  tags: string[]
  message: string
}

export const fetchPraise = (): Promise<Praise[]> => api.get<unknown, Praise[]>('/praises').then((response) => response)

export const postPraise = (to: string, message: string, tags: string[]): Promise<Praise> =>
  api.post<unknown, Praise>('/praises', { from: '', to, message, tags }).then((response) => response)
