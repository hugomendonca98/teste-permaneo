import { cookies } from 'next/headers'

export async function GET() {
  const cookiesStore = await cookies()
  const favoritesCourses = cookiesStore.get('favoritesCourses')?.value || '[]'

  return new Response(favoritesCourses, { status: 200 })
}

export async function POST(request: Request) {
  const cookiesStore = await cookies()
  const oldFavorites = cookiesStore.get('favoritesCourses')?.value || '[]'
  const res = await request.json()

  const { id } = res

  if (!id) {
    return new Response('id is required', { status: 400 })
  }

  const favorites: number[] = JSON.parse(oldFavorites)
  const isFavorite = favorites.includes(id)

  if (isFavorite) {
    const updated = favorites.filter((favoriteId) => favoriteId !== id)
    cookiesStore.set({
      name: 'favoritesCourses',
      value: JSON.stringify(updated),
      expires: new Date(Date.now() + 60 * 60 * 24 * 365),
      httpOnly: true,
    })
  }

  if (!isFavorite) {
    cookiesStore.set({
      name: 'favoritesCourses',
      value: JSON.stringify([...favorites, id]),
      expires: new Date(Date.now() + 60 * 60 * 24 * 365),
      httpOnly: true,
    })
  }

  const favoritesCourses = cookiesStore.get('favoritesCourses')?.value

  return new Response(favoritesCourses, { status: 200 })
}
