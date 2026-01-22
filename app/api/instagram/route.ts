import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.instagramPost.findMany({
      orderBy: { timestamp: 'desc' },
      take: 12,
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Erro ao buscar posts do Instagram:', error)
    return NextResponse.json([])
  }
}

export async function POST() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Token do Instagram não configurado' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=${accessToken}`
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erro ao buscar posts do Instagram' },
        { status: 500 }
      )
    }

    const data = await response.json()

    for (const post of data.data) {
      await prisma.instagramPost.upsert({
        where: { postId: post.id },
        update: {
          caption: post.caption,
          imageUrl: post.media_url,
          permalink: post.permalink,
          timestamp: new Date(post.timestamp),
        },
        create: {
          postId: post.id,
          caption: post.caption,
          imageUrl: post.media_url,
          permalink: post.permalink,
          timestamp: new Date(post.timestamp),
        },
      })
    }

    return NextResponse.json({ message: 'Posts sincronizados com sucesso' })
  } catch (error) {
    console.error('Erro ao sincronizar posts do Instagram:', error)
    return NextResponse.json(
      { error: 'Erro ao sincronizar posts' },
      { status: 500 }
    )
  }
}
