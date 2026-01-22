import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'
import { sendEventConfirmationEmail } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
})

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { eventId, paymentMethod, installments } = body

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    })

    if (!event || !event.active) {
      return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 })
    }

    if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
      return NextResponse.json({ error: 'Evento esgotado' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    // Verificar se já está inscrito
    const existing = await prisma.eventRegistration.findFirst({
      where: {
        userId: user.id,
        eventId: event.id,
        status: { in: ['pending', 'paid'] },
      },
    })

    if (existing) {
      return NextResponse.json({ error: 'Você já está inscrito neste evento' }, { status: 400 })
    }

    if (paymentMethod === 'pix') {
      // Criar registro pendente
      const registration = await prisma.eventRegistration.create({
        data: {
          userId: user.id,
          eventId: event.id,
          status: 'pending',
          paymentMethod: 'pix',
          totalPaid: 0,
        },
      })

      // Em produção, criar pagamento PIX via gateway
      // Por enquanto, retornar sucesso
      return NextResponse.json({
        message: 'Inscrição criada. Aguardando pagamento PIX.',
        registrationId: registration.id,
      })
    } else if (paymentMethod === 'credit_card') {
      // Criar checkout session no Stripe
      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: event.name,
                description: `Inscrição no evento: ${event.name}`,
              },
              unit_amount: Math.round(event.price * 100), // Stripe usa centavos
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXTAUTH_URL}/piloto?success=true`,
        cancel_url: `${process.env.NEXTAUTH_URL}/piloto/eventos/${eventId}`,
        metadata: {
          userId: user.id,
          eventId: event.id,
          type: 'event_registration',
        },
      })

      // Criar registro pendente
      await prisma.eventRegistration.create({
        data: {
          userId: user.id,
          eventId: event.id,
          status: 'pending',
          paymentMethod: 'credit_card',
          installments: installments || 1,
          totalPaid: 0,
        },
      })

      return NextResponse.json({
        checkoutUrl: checkoutSession.url,
      })
    }

    return NextResponse.json({ error: 'Método de pagamento inválido' }, { status: 400 })
  } catch (error) {
    console.error('Erro ao fazer inscrição:', error)
    return NextResponse.json(
      { error: 'Erro ao processar inscrição' },
      { status: 500 }
    )
  }
}
