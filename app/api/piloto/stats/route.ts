import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const [enrollments, orders] = await Promise.all([
      prisma.enrollment.count({
        where: { userId: session.user.id },
      }),
      prisma.order.count({
        where: { userId: session.user.id },
      }),
    ])

    return NextResponse.json({
      enrollments,
      orders,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    )
  }
}
