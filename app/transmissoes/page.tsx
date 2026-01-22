'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Youtube } from 'lucide-react'

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  videoId: string
  publishedAt: string
}

export default function TransmissoesPage() {
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Carregando transmissões...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Youtube className="w-8 h-8 text-red-600" />
        <h1 className="text-4xl font-bold">Transmissões</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/transmissoes/${video.videoId}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(video.publishedAt).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Nenhuma transmissão disponível no momento.</p>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-yellow hover:text-brand-yellow-dark font-semibold"
          >
            Visite nosso canal no YouTube →
          </a>
        </div>
      )}
    </div>
  )
}
