import { queryOptions } from '@tanstack/react-query'
import { api } from '../api'

import { ICourse } from '@/interfaces/ICourses'

export const coursesQueryOptions = queryOptions({
  queryKey: ['course'],
  queryFn: async () => {
    const data: ICourse[] | null = await api('/courses', {
      method: 'GET',
    })

    return data
  },
})
