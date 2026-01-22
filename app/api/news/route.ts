import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error('Erro ao buscar notícias:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, image, author } = body

    const news = await prisma.news.create({
      data: {
        title,
        content,
        image,
        author,
        published: false,
      },
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar notícia' },
      { status: 500 }
    )
  }
}
