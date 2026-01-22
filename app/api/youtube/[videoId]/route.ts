import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    const { videoId } = params

    if (!apiKey || !videoId) {
      return NextResponse.json(
        { error: 'Parâmetros inválidos' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=snippet,contentDetails`
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erro ao buscar vídeo' },
        { status: 500 }
      )
    }

    const data = await response.json()

    if (data.items.length === 0) {
      return NextResponse.json(
        { error: 'Vídeo não encontrado' },
        { status: 404 }
      )
    }

    const video = data.items[0]

    return NextResponse.json({
      id: video.id,
      videoId: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.high.url,
      publishedAt: video.snippet.publishedAt,
    })
  } catch (error) {
    console.error('Erro ao buscar vídeo do YouTube:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar vídeo' },
      { status: 500 }
    )
  }
}
