'use client'

import { Button } from '@/components/ui/button'
import { useFavoritesCourses } from '@/hooks/course/useFavoritesCourses'
import { cn } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { toast } from 'sonner'
interface AddCourseToFavoriteProps {
  id: number
  favoritesInitial: number[]
}

export function AddCourseToFavorite({
  id,
  favoritesInitial,
}: AddCourseToFavoriteProps) {
  const { addFavoriteCourseMutate, favoritesCourses, isError } =
    useFavoritesCourses({
      favoritesInitial,
    })

  const isFavorite = useMemo(() => {
    return favoritesCourses?.includes(id)
  }, [favoritesCourses, id])

  useEffect(() => {
    if (isError) {
      toast.error('Ocorreu um erro ao buscar os favoritos', {
        id: 'fetch-favorites-error',
      })
    }
  }, [isError])

  return (
    <Button
      size="icon"
      onClick={() => addFavoriteCourseMutate(id)}
      data-testid="add-to-favorites"
      className="bg-violet-50 border border-violet-200 rounded-full p-2"
      aria-label={
        isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
      }
    >
      <HeartIcon
        data-testid="add-to-favorites-icon"
        className={cn('h-6 w-6 transition-colors text-violet-600', {
          'fill-violet-600': isFavorite,
        })}
      />
    </Button>
  )
}
