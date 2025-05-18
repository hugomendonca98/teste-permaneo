'use client'

import { Button } from '@/components/ui/button'
import { IterationCwIcon, PlayIcon } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

interface PlayerProps {
  options: typeof videojs.options
  videoId: number
}

export const CoursePlayer: React.FC<PlayerProps> = ({ options, videoId }) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<typeof videojs.players | null>(null)

  // Remove o tempo da aula de onde usuário parou.
  const handleRestartCourse = () => {
    localStorage.removeItem(`video-time-${videoId}`)
    if (playerRef.current) {
      playerRef.current.currentTime(0)
      handlePlay()
    }
  }

  // Reproduz o video
  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.play()
    }
  }

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement('video-js')
      videoElement.classList.add('vjs-big-play-centered')

      videoRef.current.appendChild(videoElement)

      const player = videojs(videoElement, options, function () {})

      // Recupera o tempo salvo no localStorage.
      const savedTime = localStorage.getItem(`video-time-${videoId}`)

      if (savedTime) {
        // Define o tempo salvo no player.
        player.currentTime(parseFloat(savedTime))
      }

      // Salva o tempo de forma periódica no localStorage a cada timeupdate
      player.on('timeupdate', () => {
        const currentTime = player.currentTime()
        if (currentTime) {
          localStorage.setItem(`video-time-${videoId}`, currentTime.toString())
        }
      })

      playerRef.current = player
    }
  }, [options, videoId])

  useEffect(() => {
    // Desmonta o player quando o componente for desmontado.
    return () => {
      const player = playerRef.current
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [])

  return (
    <div>
      <div
        data-vjs-player
        data-testid="course-player"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'start',
          position: 'relative',
        }}
      >
        <div
          ref={videoRef}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </div>

      {/* Coloquei para que os botões fiquem sempre visíveis por conta dos critérios do teste. */}
      <Button
        type="button"
        className="w-full mt-4 flex gap-2 items-center justify-center"
        onClick={handlePlay}
        data-testid="play-video-btn"
      >
        <PlayIcon />
        Continuar aula
      </Button>
      <Button
        type="button"
        className="w-full mt-4 flex gap-2 items-center justify-center bg-violet-50 border border-violet-200 text-violet-600"
        onClick={handleRestartCourse}
        data-testid="restart-course-btn"
      >
        <IterationCwIcon />
        Reiniciar aula
      </Button>
    </div>
  )
}
