import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import WelcomeUser from './WelcomeUser'
import { fakeUserMock } from '@/test/mocks/fakeUserMock'
import * as useUser from '@/hooks/user/useUser'

vi.mock('@/hooks/user/useUser', () => ({
  useUser: () => ({
    userData: fakeUserMock,
  }),
}))

describe('WelcomeUser', () => {
  it('should be able to render WelcomeUser component correctly', () => {
    render(<WelcomeUser />)

    const welcomeUser = screen.getByTestId('welcome-user-name')
    expect(welcomeUser.textContent).toBe('Bem-vindo(a) de volta, John Doe')

    const welcomeUserCourses = screen.getByTestId('welcome-user-courses')
    expect(welcomeUserCourses.textContent).toBe('Você tem 2 cursos adquiridos.')
  })

  it('should be able to show toast on WelcomeUser api error', () => {
    vi.spyOn(useUser, 'useUser').mockImplementationOnce(() => {
      return {
        userData: null,
        isError: true,
      }
    })

    render(<WelcomeUser />)

    waitFor(() => {
      const toast = screen.getByText(
        'Ocorreu um erro ao buscar os dados do usuário',
      )
      expect(toast).toBeInTheDocument()
    })
  })
})
