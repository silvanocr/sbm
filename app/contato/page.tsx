'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Send, Mail, MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(5, 'Assunto deve ter pelo menos 5 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContatoPage() {
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: session?.user ? {
      name: session.user.name || '',
      email: session.user.email || '',
    } : {},
  })

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true)
    setSuccess(false)

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSuccess(true)
        reset()
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <MessageSquare className="w-16 h-16 text-brand-yellow mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Entre em Contato</h1>
          <p className="text-gray-600">
            Envie sua mensagem, dúvida ou sugestão. Responderemos o mais breve possível.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome *
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                disabled={!!session?.user}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                disabled={!!session?.user}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assunto *
              </label>
              <input
                {...register('subject')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem *
              </label>
              <textarea
                {...register('message')}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-yellow text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-yellow-dark transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                'Enviando...'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Mensagem
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
