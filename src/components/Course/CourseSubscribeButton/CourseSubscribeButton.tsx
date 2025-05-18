import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ICourse } from '@/interfaces/ICourses'
import React from 'react'

interface ICourseSubscribeButton {
  course: ICourse
}

export function CourseSubscribeButton({ course }: ICourseSubscribeButton) {
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
        data-testid="subscribe-button"
        className="w-full md:w-auto"
      >
        Inscrevase-se agora
      </Button>
    </>
  )
}
