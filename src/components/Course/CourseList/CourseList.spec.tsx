import { fakeCoursesMock } from '@/test/mocks/fakeCoursesMock'
import { fakeUserMock } from '@/test/mocks/fakeUserMock'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CourseList } from './CourseList'
import * as useCourses from '@/hooks/course/useCourses'

vi.mock('@/hooks/course/useCourses', () => ({
  useCourses: () => ({
    courseData: fakeCoursesMock,
    isLoading: false,
    isError: false,
  }),
}))

vi.mock('@/hooks/user/useUser', () => ({
  useUser: () => ({
    userData: fakeUserMock,
  }),
}))

describe('CourseList', () => {
  it('should be able to render CourseList component correctly', () => {
    render(<CourseList />)

    const courseItem = screen.getAllByTestId('course-item')
    expect(courseItem.length).toBe(fakeCoursesMock.length)
  })

  it('should be able to show toast on course list api error', () => {
    vi.spyOn(useCourses, 'useCourses').mockImplementationOnce(() => {
      return {
        courseData: null,
        isLoading: false,
        isError: true,
      }
    })

    render(<CourseList />)

    waitFor(() => {
      expect(
        screen.getByText('Ocorreu um erro ao buscar os cursos'),
      ).toBeDefined()
    })
  })
})
