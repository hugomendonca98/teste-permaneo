'use client'

import { useUser } from '@/hooks/user/useUser'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

export default function WelcomeUser() {
  const { userData, isError } = useUser()

  useEffect(() => {
    if (isError) {
      toast.error('Ocorreu um erro ao buscar os dados do usuário')
    }
  }, [isError])

  return (
    <div className="container mx-auto mb-8">
      <h1
        className="text-xl md:text-3xl font-semibold"
        data-testid="welcome-user-name"
      >
        Bem-vindo(a) de volta, {userData?.name}
      </h1>
      <p data-testid="welcome-user-courses">
        Você tem {userData?.courses.length} cursos adquiridos.
      </p>
    </div>
  )
}
