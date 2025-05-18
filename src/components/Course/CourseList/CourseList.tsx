'use client'

import React, { useEffect, useMemo } from 'react'
import { CourseItem } from '../CourseItem'

import { useUser } from '@/hooks/user/useUser'
import { useCourses } from '@/hooks/course/useCourses'
import { toast } from 'sonner'

export function CourseList() {
  const { userData } = useUser()
  const { courseData, isError } = useCourses()

  const acquiredCourseIds = useMemo(() => {
    return new Set(userData?.courses.map((currCourse) => currCourse.courseId))
  }, [userData?.courses])

  const sortedCoursesByAcquisition = useMemo(() => {
    return courseData?.slice().sort((a, b) => {
      const isAcquiredA = acquiredCourseIds.has(a.id)
      const isAcquiredB = acquiredCourseIds.has(b.id)
      return Number(isAcquiredB) - Number(isAcquiredA)
    })
  }, [courseData, acquiredCourseIds])

  useEffect(() => {
    if (isError) {
      toast.error('Ocorreu um erro ao buscar os cursos', {
        id: 'fetch-courses-error',
      })
    }
  }, [isError])

  return (
    <div className="flex justify-center container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {sortedCoursesByAcquisition?.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
