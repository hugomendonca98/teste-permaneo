import { fakeCoursesMock } from '@/test/mocks/fakeCoursesMock'
import { fakeUserMock } from '@/test/mocks/fakeUserMock'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CourseFavoriteList } from './CourseFavoriteList'
import * as useCourses from '@/hooks/course/useCourses'

vi.mock('@/hooks/course/useCourses', () => ({
  useCourses: () => ({
    courseData: fakeCoursesMock,
    isLoading: false,
    isError: false,
  }),
}))

vi.mock('@/hooks/course/useFavoritesCourses', () => ({
  useFavoritesCourses: () => ({
    favoritesCourses: [1, 2, 3],
    isLoading: false,
    isError: false,
  }),
}))

vi.mock('@/hooks/user/useUser', () => ({
  useUser: () => ({
    userData: fakeUserMock,
  }),
}))

describe('CourseFavoriteList', () => {
  it('should be able to render CourseFavoriteList component correctly', () => {
    render(<CourseFavoriteList favoritesInitial={[]} />)

    const courseItem = screen.getAllByTestId('course-item')
    expect(courseItem.length).toBe(3)
  })

  it('should be able to show toast on course list api error', () => {
    vi.spyOn(useCourses, 'useCourses').mockImplementationOnce(() => {
      return {
        courseData: null,
        isLoading: false,
        isError: true,
      }
    })

    render(<CourseFavoriteList favoritesInitial={[]} />)

    waitFor(() => {
      expect(
        screen.getByText('Ocorreu um erro ao buscar os cursos'),
      ).toBeDefined()
    })
  })
})
