import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AddCourseToFavorite } from './AddCourseToFavorite'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import * as useFavoritesCourses from '@/hooks/course/useFavoritesCourses'

describe('AddCourseToFavorite', () => {
  it('should be able to render AddCourseToFavorite component correctly', () => {
    render(<AddCourseToFavorite favoritesInitial={[]} id={1} />, {
      wrapper: ReactQueryProvider,
    })

    const addCourseToFavorite = screen.getByTestId('add-to-favorites')
    const addCourseToFavoriteIcon = screen.getByTestId('add-to-favorites-icon')

    expect(addCourseToFavorite).toBeDefined()
    expect(addCourseToFavoriteIcon).toBeDefined()

    expect(addCourseToFavorite.ariaLabel).toBe('Adicionar aos favoritos')
    expect(addCourseToFavoriteIcon).toHaveClass('text-violet-600')
  })

  it('should be able to add course to favorites', () => {
    render(<AddCourseToFavorite favoritesInitial={[]} id={1} />, {
      wrapper: ReactQueryProvider,
    })

    const addCourseToFavorite = screen.getByTestId('add-to-favorites')

    fireEvent.click(addCourseToFavorite)

    waitFor(() => {
      const addCourseToFavoriteIcon = screen.getByTestId(
        'add-to-favorites-icon',
      )

      expect(addCourseToFavoriteIcon).not.toHaveClass('text-violet-600')
      expect(addCourseToFavoriteIcon).toHaveClass('fill-violet-600')
    })
  })

  it('should be able to show aria label and custom style on course is favorite', () => {
    vi.spyOn(useFavoritesCourses, 'useFavoritesCourses').mockImplementationOnce(
      () => {
        return {
          addFavoriteCourseMutate: () => {},
          favoritesCourses: [1],
          isError: false,
          isLoading: false,
        }
      },
    )

    render(<AddCourseToFavorite favoritesInitial={[1]} id={1} />, {
      wrapper: ReactQueryProvider,
    })

    const addCourseToFavorite = screen.getByTestId('add-to-favorites')
    const addCourseToFavoriteIcon = screen.getByTestId('add-to-favorites-icon')

    expect(addCourseToFavorite).toBeDefined()
    expect(addCourseToFavoriteIcon).toBeDefined()
    expect(addCourseToFavoriteIcon).toHaveClass('fill-violet-600')

    expect(addCourseToFavorite.ariaLabel).toBe('Remover dos favoritos')
  })

  it('should be able to show toast on AddCourseToFavorite api error', () => {
    render(<AddCourseToFavorite favoritesInitial={[]} id={1} />, {
      wrapper: ReactQueryProvider,
    })

    const addCourseToFavorite = screen.getByTestId('add-to-favorites')

    fireEvent.click(addCourseToFavorite)

    waitFor(() => {
      expect(
        screen.getByText('Erro ao adicionar aos favoritos'),
      ).toBeInTheDocument()
    })
  })

  it('should be able to show toast on get favorites api error', () => {
    vi.spyOn(useFavoritesCourses, 'useFavoritesCourses').mockImplementationOnce(
      () => {
        return {
          addFavoriteCourseMutate: () => {},
          favoritesCourses: [],
          isError: true,
          isLoading: false,
        }
      },
    )
    render(<AddCourseToFavorite favoritesInitial={[]} id={1} />, {
      wrapper: ReactQueryProvider,
    })

    const addCourseToFavorite = screen.getByTestId('add-to-favorites')

    fireEvent.click(addCourseToFavorite)

    waitFor(() => {
      expect(
        screen.getByText('Ocorreu um erro ao buscar os favoritos'),
      ).toBeInTheDocument()
    })
  })
})
