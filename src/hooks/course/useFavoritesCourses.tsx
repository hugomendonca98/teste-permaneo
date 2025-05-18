'use client'

import { api } from '@/services/api'
import { favoritesCoursesQueryOptions } from '@/services/courses/favoritesCoursesQueryOptions'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

interface IUseFavoritesCoursesProps {
  favoritesInitial?: number[]
}

export const useFavoritesCourses = ({
  favoritesInitial,
}: IUseFavoritesCoursesProps) => {
  const queryClient = useQueryClient()

  const {
    data: favoritesCourses,
    isLoading,
    isError,
  } = useQuery({
    ...favoritesCoursesQueryOptions,
    initialData: favoritesInitial,
  })

  async function addFavoriteCourse(id: number) {
    try {
      const data: number[] = await api('/courses/favorites', {
        method: 'POST',
        body: JSON.stringify({ id }),
      })

      return data
    } catch {
      toast.error('Erro ao adicionar aos favoritos')
    }
  }
  const mutation = useMutation({
    mutationFn: addFavoriteCourse,
    onSuccess: (data, _variables) => {
      queryClient.setQueryData(favoritesCoursesQueryOptions.queryKey, data)
    },
  })

  const addFavoriteCourseMutate = (id: number) => {
    mutation.mutate(id)
    queryClient.removeQueries({
      queryKey: ['favorites'],
      exact: false,
    })
  }

  return { favoritesCourses, isLoading, isError, addFavoriteCourseMutate }
}
