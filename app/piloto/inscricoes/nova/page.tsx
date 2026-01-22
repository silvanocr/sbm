'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const enrollmentSchema = z.object({
  type: z.enum(['course', 'trackday', 'championship']),
  eventName: z.string().min(3, 'Nome do evento é obrigatório'),
  eventId: z.string().optional(),
})

type EnrollmentForm = z.infer<typeof enrollmentSchema>

export default function NovaInscricaoPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [price, setPrice] = useState(0)

  const tipo = searchParams.get('tipo') || 'course'
  const tipoMap: Record<string, 'course' | 'trackday' | 'championship'> = {
    curso: 'course',
    trackday: 'trackday',
    championship: 'championship',
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EnrollmentForm>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      type: tipoMap[tipo] || 'course',
    },
  })

  const selectedType = watch('type')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    const prices: Record<string, number> = {
      course: 500,
      trackday: 800,
      championship: 1200,
    }
    setPrice(prices[selectedType] || 0)
  }, [selectedType])

  const onSubmit = async (data: EnrollmentForm) => {
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/enrollments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          price,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Erro ao criar inscrição')
      } else {
        const paymentResponse = await fetch('/api/payments/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            enrollmentId: result.enrollment.id,
            amount: price,
            type: 'enrollment',
          }),
        })

        const paymentResult = await paymentResponse.json()

        if (paymentResult.checkoutUrl) {
          window.location.href = paymentResult.checkoutUrl
        } else if (paymentResult.sessionId) {
          router.push(`/checkout?session=${paymentResult.sessionId}`)
        } else {
          router.push(`/piloto/inscricoes/${result.enrollment.id}`)
        }
      }
    } catch (err) {
      setError('Erro ao criar inscrição. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  if (!session) return null

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Nova Inscrição</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Inscrição *
          </label>
          <select
            {...register('type')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="course">Curso</option>
            <option value="trackday">Trackday</option>
            <option value="championship">Etapa de Campeonato</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Evento *
          </label>
          <input
            {...register('eventName')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Ex: Curso de Pilotagem Avançada"
          />
          {errors.eventName && (
            <p className="mt-1 text-sm text-red-600">{errors.eventName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID do Evento (opcional)
          </label>
          <input
            {...register('eventId')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Valor:</span>
            <span className="text-2xl font-bold text-primary-600">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
          >
            {loading ? 'Processando...' : 'Confirmar e Pagar'}
          </button>
        </div>
      </form>
    </div>
  )
}
