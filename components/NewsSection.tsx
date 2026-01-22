import Link from 'next/link'
import { format } from 'date-fns'
import { prisma } from '@/lib/prisma'

interface NewsItem {
  id: string
  title: string
  content: string
  image?: string | null
  publishedAt?: Date | null
}

interface NewsSectionProps {
  news?: NewsItem[]
  category?: string
}

async function getNews(category?: string) {
  try {
    const news = await prisma.news.findMany({
      where: {
        published: true,
        ...(category && { category }),
      },
      orderBy: { publishedAt: 'desc' },
      take: 6,
    })
    return news
  } catch {
    return []
  }
}

export default async function NewsSection({ news: providedNews, category }: NewsSectionProps = {}) {
  const news = providedNews || await getNews(category)

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Últimas Notícias</h2>
          <Link href="/noticias" className="text-brand-yellow hover:text-brand-yellow-dark font-semibold">
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
