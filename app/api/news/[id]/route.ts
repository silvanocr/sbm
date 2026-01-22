import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const news = await prisma.news.findUnique({
      where: { id },
    })

    if (!news) {
      return NextResponse.json(
        { error: 'Notícia não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar notícia' },
      { status: 500 }
    )
  }
}
