import { getFavotitesCourseFromCookies } from '@/actions/getFavotitesCourseFromCookies'
import { CourseFavoriteList } from '@/components/Course/CourseFavoriteList'
import { Card } from '@/components/ui/card'
import { getQueryClient } from '@/lib/getQueryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { SquareArrowOutUpRightIcon } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Favorites() {
  const queryClient = getQueryClient()

  const favoritesInitial = await getFavotitesCourseFromCookies()

  if (!favoritesInitial || favoritesInitial?.length <= 0) {
    return (
      <div className="container mx-auto">
        <main>
          <Card className="flex flex-col justify-between px-2 gap-2 max-w-[800px] mx-auto">
            <h1 className="text-3xl text-center font-semibold">
              Você ainda não tem cursos favoritos!
            </h1>
            <p className="text-center">
              Escolha alguns cursos para adicionar aos seus favoritos.
            </p>
            <Link
              href="/"
              className="flex gap-2 items-center text-base  bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-colors text-primary-foreground shadow-xs p-2 rounded-md mt-4 text-center max-w-[200px] mx-auto"
            >
              Ir para cursos <SquareArrowOutUpRightIcon className="w-4 h-4" />
            </Link>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] mb-10 md:mb-0">
      <main>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CourseFavoriteList favoritesInitial={favoritesInitial} />
        </HydrationBoundary>
      </main>
    </div>
  )
}
