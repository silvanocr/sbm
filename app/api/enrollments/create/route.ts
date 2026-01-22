import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const enrollmentSchema = z.object({
  type: z.enum(['course', 'trackday', 'championship']),
  eventName: z.string().min(3),
  eventId: z.string().optional(),
  price: z.number().positive(),
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const data = enrollmentSchema.parse(body)

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        type: data.type,
        eventName: data.eventName,
        eventId: data.eventId,
        price: data.price,
        status: 'pending',
      },
    })

    return NextResponse.json({ enrollment }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao criar inscrição' },
      { status: 500 }
    )
  }
}
