import { queryOptions } from '@tanstack/react-query'
import { api } from '../api'
import { IUser } from '@/interfaces/IUser'

export const userQueryOptions = queryOptions({
  queryKey: ['user'],
  queryFn: async () => {
    const data: IUser | null = await api('/user', {
      method: 'GET',
    })

    return data
  },
})
