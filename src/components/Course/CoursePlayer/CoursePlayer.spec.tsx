import { act, screen, render, waitFor, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CoursePlayer } from './CoursePlayer'

vi.mock('video.js/dist/video-js.css', () => ({}))

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
})

afterEach(() => {
  vi.useRealTimers()
})

describe('CoursePlayer', () => {
  it('should be able to render CoursePlayer component correctly', () => {
    render(
      <CoursePlayer
        options={{
          autoplay: false,
          controls: true,
          width: 640,
          height: 360,
          poster: 'https://vjs.zencdn.net/v/oceans.png',
          sources: [
            {
              src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              type: 'video/mp4',
            },
          ],
        }}
        videoId={1}
      />,
    )

    const coursePlayer = screen.getByTestId('course-player')
    expect(coursePlayer).toBeDefined()
  })

  it('should be able to video link is correctly', () => {
    render(
      <CoursePlayer
        options={{
          autoplay: false,
          controls: true,
          width: 640,
          height: 360,
          poster: 'https://vjs.zencdn.net/v/oceans.png',
          sources: [
            {
              src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              type: 'video/mp4',
            },
          ],
        }}
        videoId={1}
      />,
    )

    waitFor(() => {
      const coursePlayer = screen.getByTestId('course-player')
      expect(coursePlayer).toBeDefined()
      const videoElement = screen.getByRole('application') as HTMLVideoElement
      expect(videoElement.src).toBe(
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      )
    })
  })

  it('should be able to render post of video correctly', () => {
    const { container } = render(
      <CoursePlayer
        options={{
          autoplay: false,
          controls: true,
          width: 640,
          height: 360,
          poster: 'https://vjs.zencdn.net/v/oceans.png',
          sources: [
            {
              src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              type: 'video/mp4',
            },
          ],
        }}
        videoId={1}
      />,
    )

    waitFor(() => {
      const poster = container.getElementsByClassName('vjs-poster')[0]
        ?.firstChild as HTMLImageElement
      expect(poster?.src).toBe('https://vjs.zencdn.net/v/oceans.png')
    })
  })

  it('should be able to restart course', () => {
    render(
      <CoursePlayer
        options={{
          autoplay: false,
          controls: true,
          width: 640,
          height: 360,
          poster: 'https://vjs.zencdn.net/v/oceans.png',
          sources: [
            {
              src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              type: 'video/mp4',
            },
          ],
        }}
        videoId={1}
      />,
    )

    const restartButton = screen.getByTestId('restart-course-btn')
    expect(restartButton).toBeDefined()

    expect(restartButton.textContent).toBe('Reiniciar aula')

    fireEvent.click(restartButton)

    waitFor(() => {
      expect(localStorage.getItem('video-time-1')).toBeNull()
    })
  })

  it('should be able to play video', () => {
    render(
      <CoursePlayer
        options={{
          autoplay: false,
          controls: true,
          width: 640,
          height: 360,
          poster: 'https://vjs.zencdn.net/v/oceans.png',
          sources: [
            {
              src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              type: 'video/mp4',
            },
          ],
        }}
        videoId={1}
      />,
    )

    const playButton = screen.getByTestId('play-video-btn')
    expect(playButton).toBeDefined()

    expect(playButton.textContent).toBe('Continuar aula')

    fireEvent.click(playButton)

    waitFor(() => {
      const videoElement = screen.getByRole('application') as HTMLVideoElement
      expect(videoElement.src).toBe(
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      )
      expect(videoElement.paused).toBe(false)
    })
  })

  it('should be able to save video time in localStorage', async () => {
    const { container } = render(
      <CoursePlayer
        options={{
          autoplay: false,
          controls: true,
          width: 640,
          height: 360,
          poster: 'https://vjs.zencdn.net/v/oceans.png',
          sources: [
            {
              src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              type: 'video/mp4',
            },
          ],
        }}
        videoId={1}
      />,
    )

    const playButton = container.getElementsByClassName(
      'vjs-big-play-button',
    )[0]

    fireEvent.click(playButton)

    await act(() => vi.advanceTimersByTime(100))

    waitFor(() => {
      expect(localStorage.getItem('video-time-1')).toBe(100)
    })
  })

  it('should be able to init video with time saved in localStorage', async () => {
    localStorage.setItem('video-time-2', '10')

    render(
      <CoursePlayer
        options={{
          autoplay: false,
          controls: true,
          width: 640,
          height: 360,
          poster: 'https://vjs.zencdn.net/v/oceans.png',
          sources: [
            {
              src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              type: 'video/mp4',
            },
          ],
        }}
        videoId={2}
      />,
    )

    waitFor(() => {
      const videoElement = screen.getByRole('application') as HTMLVideoElement
      expect(videoElement.currentTime).toBe(10)
    })
  })
})
