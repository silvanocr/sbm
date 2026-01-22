import { prisma } from '@/lib/prisma'
import NewsSection from '@/components/NewsSection'
import InstagramFeed from '@/components/InstagramFeed'
import YouTubeSection from '@/components/YouTubeSection'
import { Trophy } from 'lucide-react'
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface NewsItem {
  id: string
  title: string
  content: string
  image?: string | null
  publishedAt?: Date | null
}

export default async function CampeonatoGauchoPage() {
  noStore()
  let news: NewsItem[] = []
  
  // Só tenta buscar do banco se DATABASE_URL estiver disponível
  if (process.env.DATABASE_URL) {
    try {
      news = await prisma.news.findMany({
        where: {
          published: true,
          category: 'campeonato-gaucho',
        },
        orderBy: { publishedAt: 'desc' },
        take: 6,
      })
    } catch (error) {
      // Silenciosamente ignora erros durante build
      if (process.env.NODE_ENV !== 'production') {
        console.error('Erro ao buscar notícias:', error)
      }
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-black via-gray-900 to-brand-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black mb-4">Campeonato Gaúcho</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A competição que reúne os melhores pilotos do Rio Grande do Sul
          </p>
        </div>
      </div>

      {/* Notícias */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-brand-yellow" />
          <h2 className="text-3xl font-bold">Notícias do Campeonato</h2>
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
