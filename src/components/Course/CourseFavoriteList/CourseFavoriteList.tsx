'use client'

import React, { useEffect, useMemo } from 'react'
import { CourseItem } from '../CourseItem'

import { useCourses } from '@/hooks/course/useCourses'
import { toast } from 'sonner'
import { useFavoritesCourses } from '@/hooks/course/useFavoritesCourses'

interface ICourseFavoriteListProps {
  favoritesInitial: number[]
}

export function CourseFavoriteList({
  favoritesInitial,
}: ICourseFavoriteListProps) {
  const { courseData, isError } = useCourses()

  const { favoritesCourses } = useFavoritesCourses({
    favoritesInitial,
  })

  const faavoritesCourses = useMemo(() => {
    return courseData?.filter((course) => favoritesCourses?.includes(course.id))
  }, [courseData, favoritesCourses])

  useEffect(() => {
    if (isError) {
      toast.error('Ocorreu um erro ao buscar os cursos', {
        id: 'fetch-courses-error',
      })
    }
  }, [isError])

  return (
    <div className="flex justify-center container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {faavoritesCourses?.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
