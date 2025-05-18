import { queryOptions } from '@tanstack/react-query'
import { api } from '../api'

export const favoritesCoursesQueryOptions = queryOptions({
  queryKey: ['favorites'],
  queryFn: async () => {
    const data: number[] | null = await api('/courses/favorites', {
      method: 'GET',
    })

    return data
  },
})
