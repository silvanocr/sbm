import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

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

    const { enrollmentId, orderId, type } = session.metadata || {}

    if (type === 'enrollment' && enrollmentId) {
      await prisma.enrollment.update({
        where: { id: enrollmentId },
        data: {
          status: 'paid',
          paymentId: session.payment_intent as string,
          receiptUrl: session.receipt_url || undefined,
        },
      })
    } else if (type === 'order' && orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'paid',
          paymentId: session.payment_intent as string,
          receiptUrl: session.receipt_url || undefined,
        },
      })
    }
  }

  return NextResponse.json({ received: true })
}
