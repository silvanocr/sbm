import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { sendEventConfirmationEmail } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Assinatura não encontrada' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (err) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const { enrollmentId, orderId, eventId, userId, type } = session.metadata || {}

    if (type === 'enrollment' && enrollmentId) {
      await prisma.enrollment.update({
        where: { id: enrollmentId },
        data: {
          status: 'paid',
          paymentId: session.payment_intent as string,
          receiptUrl: (session as any).receipt_url || null,
        },
      })
    } else if (type === 'order' && orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'paid',
          paymentId: session.payment_intent as string,
          receiptUrl: (session as any).receipt_url || null,
        },
      })
    } else if (type === 'event_registration' && eventId && userId) {
      const registration = await prisma.eventRegistration.findFirst({
        where: {
          userId,
          eventId,
          status: 'pending',
        },
        include: {
          event: true,
          user: true,
        },
      })

      if (registration) {
        await prisma.eventRegistration.update({
          where: { id: registration.id },
          data: {
            status: 'paid',
            paymentId: session.payment_intent as string,
            receiptUrl: (session as any).receipt_url || null,
            totalPaid: registration.event.price,
          },
        })

        // Atualizar contador de participantes
        await prisma.event.update({
          where: { id: eventId },
          data: {
            currentParticipants: {
              increment: 1,
            },
          },
        })

        // Enviar email de confirmação
        if (registration.user.email) {
          await sendEventConfirmationEmail({
            to: registration.user.email,
            userName: registration.user.name,
            eventName: registration.event.name,
            eventDate: registration.event.eventDate,
            amount: registration.event.price,
            receiptUrl: (session as any).receipt_url || null,
          })
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
