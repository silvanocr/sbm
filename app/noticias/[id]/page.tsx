import { notFound } from 'next/navigation'
import Image from 'next/image'

async function getNewsItem(id: string) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/news/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function NewsItemPage({
  params,
}: {
  params: { id: string }
}) {
  const news = await getNewsItem(params.id)

  if (!news) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article>
        {news.image && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          {news.author && <span>Por {news.author}</span>}
          {news.publishedAt && (
            <span>
              {new Date(news.publishedAt).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </article>
    </div>
  )
}
