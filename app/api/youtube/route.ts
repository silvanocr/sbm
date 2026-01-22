import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    const channelId = process.env.YOUTUBE_CHANNEL_ID

    if (!apiKey || !channelId) {
      return NextResponse.json([])
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=20&type=video`
    )

    if (!response.ok) {
      return NextResponse.json([])
    }

    const data = await response.json()

    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }))

    return NextResponse.json(videos)
  } catch (error) {
    console.error('Erro ao buscar vídeos do YouTube:', error)
    return NextResponse.json([])
  }
}
