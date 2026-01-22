'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) {
      setLoading(false)
      return
    }

    const loadStripe = async () => {
      const { loadStripe } = await import('@stripe/stripe-js')
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
      )

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      } else {
        setLoading(false)
      }
    }

    loadStripe()
  }, [sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg mb-4">Redirecionando para o pagamento...</p>
        {loading && (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        )}
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
