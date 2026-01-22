import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const messageSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = messageSchema.parse(body)

    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || null

    const message = await prisma.message.create({
      data: {
        userId,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    })

    return NextResponse.json({ message: 'Mensagem enviada com sucesso', id: message.id })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao enviar mensagem' },
      { status: 500 }
    )
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return NextResponse.json(messages)
}
