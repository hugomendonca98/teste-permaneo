import { render, screen } from '@testing-library/react'
import Menu from './Menu'

describe('Menu', () => {
  it('should be able to render Menu component correctly', () => {
    render(<Menu />)

    const menu = screen.getByTestId('menu')
    const logo = screen.getByTestId('logo')
    const menuItemHome = screen.getByTestId('menu-home')
    const menuItemFavorites = screen.getByTestId('menu-favorites')

    expect(logo).toBeDefined()
    expect(menu).toBeDefined()

    expect(menuItemHome).toBeDefined()
    expect(menuItemFavorites).toBeDefined()

    expect(menuItemHome).toHaveAttribute('href', '/')
    expect(menuItemFavorites).toHaveAttribute('href', '/course/favorites')
  })
})
