import Link from 'next/link'
import { format } from 'date-fns'

async function getNews() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/news`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function NoticiasPage() {
  const news = await getNews()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Notícias</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item: any) => (
          <Link
            key={item.id}
            href={`/noticias/${item.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {item.image && (
              <div className="relative w-full h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {item.content.substring(0, 200)}...
              </p>
              <p className="text-sm text-gray-400">
                {item.publishedAt
                  ? format(new Date(item.publishedAt), "dd 'de' MMMM 'de' yyyy")
                  : 'Não publicado'}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {news.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          Nenhuma notícia publicada ainda.
        </p>
      )}
    </div>
  )
}
