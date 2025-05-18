import { getFavotitesCourseFromCookies } from '@/actions/getFavotitesCourseFromCookies'
import { AddCourseToFavorite } from '@/components/Course/AddCourseToFavorite'
import { CourseSubscribeButton } from '@/components/Course/CourseSubscribeButton/CourseSubscribeButton'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { formatToCurrency } from '@/lib/formatToCurrency'
import { getQueryClient } from '@/lib/getQueryClient'
import { coursesQueryOptions } from '@/services/courses/coursesQueryOptions'
import { userQueryOptions } from '@/services/user/userQueryOptions'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Params = Promise<{ id: string }>

export default async function CheckoutPage({ params }: { params: Params }) {
  const { id } = await params

  const queryClient = getQueryClient()
  const userData = await queryClient.fetchQuery(userQueryOptions)

  const isAcquiredCourse = userData?.courses.some(
    (course) => course.courseId === Number(id),
  )

  if (isAcquiredCourse) {
    return redirect(`/course/${id}`)
  }

  const coursesData = await queryClient.fetchQuery(coursesQueryOptions)

  const course = coursesData?.find((course) => course.id === Number(id))

  await queryClient.fetchQuery(coursesQueryOptions)

  const favoritesInitial = await getFavotitesCourseFromCookies()

  if (!course) {
    return redirect('/')
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-4 md:container mx-auto md:max-w-[800px]">
        <Card className="flex flex-col justify-between px-2 gap-2">
          <div className="flex justify-end md:mb-4 md:pr-4">
            <AddCourseToFavorite
              id={course.id}
              favoritesInitial={favoritesInitial}
            />
          </div>
          <div className="flex flex-col gap-2">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between">
                <CardTitle className="text-3xl font-bold">
                  {course.title}
                </CardTitle>
                <p className="text-2xl text-violet-700 font-bold mt-2 md:mt-0">
                  {formatToCurrency(course.price)}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {course.description}
              </CardDescription>
              <Separator className="my-2" />
            </CardContent>
          </div>
          <CardFooter className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
            <CourseSubscribeButton course={course} />
          </CardFooter>
        </Card>
      </main>
    </HydrationBoundary>
  )
}
