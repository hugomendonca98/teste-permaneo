import { CourseList } from '@/components/Course/CourseList'
import WelcomeUser from '@/components/User/WelcomeUser/WelcomeUser'
import { getQueryClient } from '@/lib/getQueryClient'
import { coursesQueryOptions } from '@/services/courses/coursesQueryOptions'
import { userQueryOptions } from '@/services/user/userQueryOptions'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

export const dynamic = 'force-dynamic'
export default async function Home() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(userQueryOptions)

  await queryClient.prefetchQuery(coursesQueryOptions)

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] mb-10 md:mb-0">
      <main>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <WelcomeUser />
          <CourseList />
        </HydrationBoundary>
      </main>
    </div>
  )
}
