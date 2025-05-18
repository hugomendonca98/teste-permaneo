import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CourseItem } from './CouseItem'
import { fakeUserMock } from '@/test/mocks/fakeUserMock'

vi.mock('@/hooks/user/useUser', () => ({
  useUser: () => ({
    userData: fakeUserMock,
  }),
}))

describe('CourseItem', () => {
  it('should be able to render CourseItem component correctly', () => {
    render(
      <CourseItem
        course={{
          created_at: '2023-01-15',
          description: 'Description test',
          id: 99,
          price: 49.99,
          title: 'title test',
        }}
      />,
    )

    const courseTitle = screen.getByTestId('course-title')
    const courseDescription = screen.getByTestId('course-description')
    const coursePrice = screen.getByTestId('course-price')
    const courseCta = screen.getByTestId('course-cta')

    expect(courseTitle.textContent).toBe('title test')
    expect(courseDescription.textContent).toBe('Description test')
    expect(coursePrice.textContent?.replace(/\u00A0/g, ' ')).toBe('R$ 49,99')
    expect(courseCta.textContent).toBe('Comprar')
  })

  it('should be able to render CourseItem component with acquired course', () => {
    render(
      <CourseItem
        course={{
          created_at: '2023-01-15',
          description: 'Description test',
          id: 1,
          price: 49.99,
          title: 'title test',
        }}
      />,
    )

    const courseCta = screen.getByTestId('course-cta')
    const playIcon = screen.getByTestId('play-icon')

    expect(playIcon).toBeDefined()

    expect(courseCta.textContent).toBe('Continuar curso')
  })
})
