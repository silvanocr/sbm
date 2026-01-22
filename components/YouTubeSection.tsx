'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Youtube, Play } from 'lucide-react'

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  videoId: string
  publishedAt: string
}

export default function YouTubeSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/youtube')
      .then(res => res.json())
      .then(data => {
        setVideos(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Youtube className="w-6 h-6 text-red-600" />
        <h2 className="text-2xl font-bold">Últimas Transmissões</h2>
      </div>
      {loading ? (
        <p className="text-gray-500">Carregando vídeos...</p>
      ) : videos.length > 0 ? (
        <div className="space-y-4">
          {videos.slice(0, 3).map((video) => (
            <Link
              key={video.id}
              href={`/transmissoes/${video.videoId}`}
              className="flex gap-4 hover:opacity-80 transition"
            >
              <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(video.publishedAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href="/transmissoes"
            className="block text-center text-brand-yellow hover:text-brand-yellow-dark font-semibold mt-4"
          >
            Ver todas as transmissões →
          </Link>
        </div>
      ) : (
        <p className="text-gray-500">Nenhum vídeo disponível.</p>
      )}
    </div>
  )
}
