import { prisma } from '@/lib/prisma'
import NewsSection from '@/components/NewsSection'
import InstagramFeed from '@/components/InstagramFeed'
import YouTubeSection from '@/components/YouTubeSection'
import { Calendar } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CopaCBPage() {
  let news = []
  try {
    news = await prisma.news.findMany({
      where: {
        published: true,
        category: 'copa-cb',
      },
      orderBy: { publishedAt: 'desc' },
      take: 6,
    })
  } catch (error) {
    console.error('Erro ao buscar notícias:', error)
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-black via-gray-900 to-brand-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black mb-4">Copa Carlos Barcelos</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A maior competição de motovelocidade do sul do Brasil
          </p>
        </div>
      </div>

      {/* Notícias */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="w-8 h-8 text-brand-yellow" />
          <h2 className="text-3xl font-bold">Notícias da Copa CB</h2>
        </div>
        <NewsSection news={news} />
      </div>

      {/* Instagram e YouTube */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <InstagramFeed />
          <YouTubeSection />
        </div>
      </div>
    </div>
  )
}
