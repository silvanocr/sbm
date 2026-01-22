'use client'

import { useEffect, useState } from 'react'
import { Instagram, Play } from 'lucide-react'

interface InstagramPost {
  id: string
  postId: string
  caption: string
  imageUrl: string
  permalink: string
  timestamp: string
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  // Vídeo destacado do Instagram
  const featuredVideo = {
    id: 'featured-video',
    postId: 'DTiSoDZkbeV',
    permalink: 'https://www.instagram.com/reel/DTiSoDZkbeV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    isVideo: true,
  }

  useEffect(() => {
    fetch('/api/instagram')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Instagram className="w-6 h-6 text-brand-yellow" />
        <h2 className="text-2xl font-bold">Instagram</h2>
      </div>
      {loading ? (
        <p className="text-gray-500">Carregando posts...</p>
      ) : (
        <div className="space-y-4">
          {/* Vídeo Destacado */}
          <a
            href={featuredVideo.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-video rounded-lg overflow-hidden hover:opacity-90 transition group"
          >
            <div className="w-full h-full bg-gradient-to-br from-brand-black to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-brand-yellow rounded-full p-4 mb-3 mx-auto w-fit group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-brand-black" fill="currentColor" />
                </div>
                <p className="text-white font-semibold">Assistir no Instagram</p>
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-brand-yellow text-brand-black px-2 py-1 rounded text-xs font-bold">
              REEL
            </div>
          </a>

          {/* Grid de Posts */}
          {posts.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {posts.slice(0, 4).map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square rounded-lg overflow-hidden hover:opacity-80 transition"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.caption || 'Instagram post'}
                    className="w-full h-full object-cover"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      )}
      {!loading && posts.length === 0 && (
        <p className="text-gray-500">Nenhum post do Instagram disponível.</p>
      )}
    </div>
  )
}
