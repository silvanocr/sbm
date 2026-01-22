import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import Stripe from 'stripe'
import { authOptions } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { enrollmentId, orderId, amount, type } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valor inválido' },
        { status: 400 }
      )
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: type === 'enrollment' ? 'Inscrição' : 'Produto',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/piloto/comprovantes?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/piloto?canceled=true`,
      metadata: {
        userId: session.user.id,
        enrollmentId: enrollmentId || '',
        orderId: orderId || '',
        type: type || 'enrollment',
      },
    })

    return NextResponse.json({ 
      sessionId: stripeSession.id,
      checkoutUrl: stripeSession.url 
    })
  } catch (error) {
    console.error('Erro ao criar sessão de pagamento:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}
