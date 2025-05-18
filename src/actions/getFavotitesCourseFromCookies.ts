'use server'

import { cookies } from 'next/headers'

export async function getFavotitesCourseFromCookies() {
  const cookiesStore = await cookies()
  const favoritesCourses = cookiesStore.get('favoritesCourses')?.value || '[]'
  return JSON.parse(favoritesCourses)
}
