'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, QrCode } from 'lucide-react'

interface Event {
  id: string
  name: string
  price: number
  maxInstallments?: number
}

interface User {
  id: string
  email: string
  name: string
}

export default function EventRegistrationForm({ event, user }: { event: Event; user: User }) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card'>('pix')
  const [installments, setInstallments] = useState(1)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          paymentMethod,
          installments: paymentMethod === 'credit_card' ? installments : 1,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl
        } else {
          router.push('/piloto?success=registered')
        }
      }
    } catch (error) {
      console.error('Erro ao fazer inscrição:', error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Finalizar Inscrição</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Método de Pagamento
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('pix')}
              className={`p-4 border-2 rounded-lg transition ${
                paymentMethod === 'pix'
                  ? 'border-brand-yellow bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <QrCode className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">PIX</p>
              <p className="text-sm text-gray-600">Aprovação imediata</p>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('credit_card')}
              className={`p-4 border-2 rounded-lg transition ${
                paymentMethod === 'credit_card'
                  ? 'border-brand-yellow bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Cartão de Crédito</p>
              <p className="text-sm text-gray-600">Parcelado em até 12x</p>
            </button>
          </div>
        </div>

        {paymentMethod === 'credit_card' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parcelas
            </label>
            <select
              value={installments}
              onChange={(e) => setInstallments(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
            >
              {Array.from({ length: Math.min(event.maxInstallments || 12, 12) }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}x de R$ {(event.price / num).toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Valor do Evento</span>
            <span className="font-semibold">R$ {event.price.toFixed(2)}</span>
          </div>
          {paymentMethod === 'credit_card' && installments > 1 && (
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Parcelado em {installments}x</span>
              <span>R$ {(event.price / installments).toFixed(2)}/mês</span>
            </div>
          )}
          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-lg text-brand-yellow">R$ {event.price.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="w-full bg-brand-yellow text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-yellow-dark transition disabled:opacity-50"
        >
          {processing ? 'Processando...' : 'Confirmar Inscrição'}
        </button>
      </form>
    </div>
  )
}
