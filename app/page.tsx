import Hero from '@/components/Hero'
import NewsSection from '@/components/NewsSection'
import InstagramFeed from '@/components/InstagramFeed'
import YouTubeSection from '@/components/YouTubeSection'

export default function Home() {
  return (
    <div>
      <Hero />
      <NewsSection />
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <InstagramFeed />
          <YouTubeSection />
        </div>
      </div>
    </div>
  )
}
