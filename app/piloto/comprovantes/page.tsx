'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { FileText, Download, CheckCircle } from 'lucide-react'

interface Receipt {
  id: string
  type: 'enrollment' | 'order'
  description: string
  amount: number
  status: string
  receiptUrl: string | null
  createdAt: string
}

function ComprovantesContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (session) {
      fetch('/api/piloto/comprovantes')
        .then(res => res.json())
        .then(data => {
          setReceipts(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [session, status, router])

  const success = searchParams.get('success')

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Comprovantes</h1>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Pagamento realizado com sucesso!
        </div>
      )}

      {receipts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Nenhum comprovante disponível.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{receipt.description}</h3>
                <p className="text-gray-600 mb-1">
                  Valor: R$ {receipt.amount.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(receipt.createdAt).toLocaleDateString('pt-BR')}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    receipt.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {receipt.status === 'paid' ? 'Pago' : 'Pendente'}
                </span>
              </div>
              {receipt.receiptUrl && (
                <a
                  href={receipt.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Baixar Comprovante
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ComprovantesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <ComprovantesContent />
    </Suspense>
  )
}
