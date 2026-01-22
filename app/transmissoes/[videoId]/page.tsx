'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import YouTube from 'react-youtube'

export default function VideoPage() {
  const params = useParams()
  const videoId = params.videoId as string
  const [videoInfo, setVideoInfo] = useState<any>(null)

  useEffect(() => {
    if (videoId) {
      fetch(`/api/youtube/${videoId}`)
        .then(res => res.json())
        .then(data => setVideoInfo(data))
        .catch(() => {})
    }
  }, [videoId])

  const opts = {
    height: '600',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {videoInfo && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{videoInfo.title}</h1>
          <p className="text-gray-600">
            Publicado em{' '}
            {new Date(videoInfo.publishedAt).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      )}

      <div className="bg-black rounded-lg overflow-hidden aspect-video mb-6">
        <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
      </div>

      {videoInfo?.description && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Descrição</h2>
          <p className="text-gray-700 whitespace-pre-line">{videoInfo.description}</p>
        </div>
      )}
    </div>
  )
}
