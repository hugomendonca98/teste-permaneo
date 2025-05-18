import { ICourse } from '@/interfaces/ICourses'
import React, { useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { formatToCurrency } from '@/lib/formatToCurrency'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/user/useUser'
import { cn } from '@/lib/utils'
import { PlayCircleIcon } from 'lucide-react'

export function CourseItem({ course }: { course: ICourse }) {
  const { userData } = useUser()

  const acquiredCourseIds = useMemo(() => {
    return new Set(userData?.courses.map((currCourse) => currCourse.courseId))
  }, [userData?.courses])

  const isAcquiredCourse = acquiredCourseIds.has(course.id)

  const definyHrf = useMemo(() => {
    if (isAcquiredCourse) {
      return `/course/${course.id}`
    }

    return `/course/checkout/${course.id}`
  }, [course.id, isAcquiredCourse])

  return (
    <Link href={definyHrf} data-testid="course-item">
      <Card className="w-full md:w-[280px] h-[250px] flex flex-col justify-between hover:shadow-violet-400 transition-shadow">
        <div className="flex flex-col gap-2">
          <CardHeader>
            <CardTitle data-testid="course-title">{course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription data-testid="course-description">
              {course.description}
            </CardDescription>
          </CardContent>
        </div>
        <CardFooter className="flex justify-between">
          {!isAcquiredCourse && (
            <p data-testid="course-price">{formatToCurrency(course.price)}</p>
          )}
          <Button
            className={cn('flex justify-center gap-2 items-center', {
              'w-full': isAcquiredCourse,
            })}
            data-testid="course-cta"
          >
            {isAcquiredCourse && (
              <PlayCircleIcon className="mt-0.5" data-testid="play-icon" />
            )}
            {isAcquiredCourse ? 'Continuar curso' : 'Comprar'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
