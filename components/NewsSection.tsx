import Link from 'next/link'
import { format } from 'date-fns'

async function getNews() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/news`, {
      cache: 'no-store',
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function NewsSection() {
  const news = await getNews()

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Últimas Notícias</h2>
          <Link href="/noticias" className="text-primary-600 hover:text-primary-700 font-semibold">
            Ver todas →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item: any) => (
            <Link
              key={item.id}
              href={`/noticias/${item.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.content.substring(0, 150)}...
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
          <p className="text-center text-gray-500 py-8">
            Nenhuma notícia publicada ainda.
          </p>
        )}
      </div>
    </section>
  )
}
