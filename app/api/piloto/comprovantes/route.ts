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
      prisma.enrollment.findMany({
        where: { userId: session.user.id, status: 'paid' },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.findMany({
        where: { userId: session.user.id, status: 'paid' },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    const receipts = [
      ...enrollments.map((e) => ({
        id: e.id,
        type: 'enrollment' as const,
        description: e.eventName,
        amount: e.price,
        status: e.status,
        receiptUrl: e.receiptUrl,
        createdAt: e.createdAt.toISOString(),
      })),
      ...orders.map((o) => ({
        id: o.id,
        type: 'order' as const,
        description: 'Pedido de Produtos',
        amount: o.total,
        status: o.status,
        receiptUrl: o.receiptUrl,
        createdAt: o.createdAt.toISOString(),
      })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(receipts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar comprovantes' },
      { status: 500 }
    )
  }
}
