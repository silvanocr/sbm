'use client'

import { useEffect, useState } from 'react'
import { Instagram } from 'lucide-react'

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
      ) : posts.length > 0 ? (
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
      ) : (
        <p className="text-gray-500">Nenhum post do Instagram disponível.</p>
      )}
    </div>
  )
}
