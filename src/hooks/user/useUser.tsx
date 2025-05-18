'use client'

import { userQueryOptions } from '@/services/user/userQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useUser() {
  const { data: userData, isError } = useSuspenseQuery(userQueryOptions)

  return { userData, isError }
}
