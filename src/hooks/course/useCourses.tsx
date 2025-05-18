'use client'

import { coursesQueryOptions } from '@/services/courses/coursesQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useCourses() {
  const {
    data: courseData,
    isLoading,
    isError,
  } = useSuspenseQuery(coursesQueryOptions)
  return { courseData, isLoading, isError }
}
