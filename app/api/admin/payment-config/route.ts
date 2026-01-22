import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const config = await prisma.paymentConfig.findFirst()
  return NextResponse.json(config)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()

  const config = await prisma.paymentConfig.create({
    data: {
      stripePublicKey: data.stripePublicKey || null,
      stripeSecretKey: data.stripeSecretKey || null,
      pixEnabled: data.pixEnabled ?? true,
      creditCardEnabled: data.creditCardEnabled ?? true,
      maxInstallments: data.maxInstallments || 12,
      installmentsWithoutInterest: data.installmentsWithoutInterest || 3,
      interestRate: data.interestRate || 0.02,
    },
  })

  return NextResponse.json(config)
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const existing = await prisma.paymentConfig.findFirst()

  if (!existing) {
    return POST(request)
  }

  const config = await prisma.paymentConfig.update({
    where: { id: existing.id },
    data: {
      stripePublicKey: data.stripePublicKey || null,
      stripeSecretKey: data.stripeSecretKey || null,
      pixEnabled: data.pixEnabled ?? true,
      creditCardEnabled: data.creditCardEnabled ?? true,
      maxInstallments: data.maxInstallments || 12,
      installmentsWithoutInterest: data.installmentsWithoutInterest || 3,
      interestRate: data.interestRate || 0.02,
    },
  })

  return NextResponse.json(config)
}
