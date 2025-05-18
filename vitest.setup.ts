import { cleanup } from '@testing-library/react'
import { config } from 'dotenv'
import '@testing-library/jest-dom'

import { afterEach, vi } from 'vitest'

config({ path: '.env.test' })

afterEach(() => {
  cleanup()
})

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
})

vi.mock('server-only', () => {
  return {}
})

vi.mock('use server', () => {
  return {}
})
