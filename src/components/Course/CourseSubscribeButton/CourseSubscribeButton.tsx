'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ICourse } from '@/interfaces/ICourses'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ICourseSubscribeButton {
  course: ICourse
}

export function CourseSubscribeButton({ course }: ICourseSubscribeButton) {
  const router = useRouter()
  const handleSubscribe = () => {
    router.push(`/`)
  }
  return (
    <>
      <Badge
        variant="outline"
        data-testid="course-created-at"
        className="bg-violet-50 text-violet-700 border-violet-200"
      >
        O curso começa em:{' '}
        {new Date(course.created_at).toLocaleDateString('pt-BR', {
          timeZone: 'UTC',
        })}
      </Badge>

      <Button
        type="button"
        onClick={handleSubscribe}
        data-testid="subscribe-button"
        className="w-full md:w-auto"
      >
        Inscrevase-se agora
      </Button>
    </>
  )
}
