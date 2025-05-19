import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CourseSubscribeButton } from './CourseSubscribeButton'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('CourseSubscribeButton', () => {
  it('should be able to render CourseSubscribeButton component correctly', () => {
    render(
      <CourseSubscribeButton
        course={{
          created_at: '2023-01-15',
          description: 'Description test',
          id: 99,
          price: 49.99,
          title: 'title test',
        }}
      />,
    )

    const courseCreatedAt = screen.getByTestId('course-created-at')
    const subscribeButton = screen.getByTestId('subscribe-button')

    expect(courseCreatedAt.textContent).toBe('O curso começa em: 15/01/2023')
    expect(subscribeButton.textContent).toBe('Inscreva-se agora')
  })
})
