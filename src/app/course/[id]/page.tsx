import { getFavotitesCourseFromCookies } from '@/actions/getFavotitesCourseFromCookies'
import { AddCourseToFavorite } from '@/components/Course/AddCourseToFavorite'
import { CoursePlayer } from '@/components/Course/CoursePlayer'
import { Card } from '@/components/ui/card'
import { getQueryClient } from '@/lib/getQueryClient'
import { coursesQueryOptions } from '@/services/courses/coursesQueryOptions'
import { userQueryOptions } from '@/services/user/userQueryOptions'
import { redirect } from 'next/navigation'
import React from 'react'

type Params = Promise<{ id: string }>

export default async function page({ params }: { params: Params }) {
  const { id } = await params

  const queryClient = getQueryClient()
  const userData = await queryClient.fetchQuery(userQueryOptions)

  const isAcquiredCourse = userData?.courses.some(
    (course) => course.courseId === Number(id),
  )

  if (!isAcquiredCourse) {
    return redirect(`/checkout/${id}`)
  }

  const coursesData = await queryClient.fetchQuery(coursesQueryOptions)

  const course = coursesData?.find((course) => course.id === Number(id))

  const favoritesInitial = await getFavotitesCourseFromCookies()

  return (
    <main className="container mx-auto flex flex-col justify-center items-center mt-4 mb-10">
      <Card className="flex flex-col justify-between px-4 gap-2">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl md:text-3xl font-semibold">
              {course?.title}
            </h1>
            <p className="text-sm md:text-base mb-4">{course?.description}</p>
          </div>
          <AddCourseToFavorite
            id={Number(id)}
            favoritesInitial={favoritesInitial}
          />
        </div>

        <div className=" w-full md:w-[800px]">
          <CoursePlayer
            videoId={Number(id)}
            options={{
              controls: true,
              fluid: true,
              poster:
                'https://i.ytimg.com/vi/aqz-KE-bpKQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDRl_kHWj4a-ghPbJ_lnJ93tNWYwg',
              sources: [
                {
                  src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  type: 'video/mp4',
                },
              ],
            }}
          />
        </div>
      </Card>
    </main>
  )
}
