'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { User, FileText, ShoppingBag, Calendar } from 'lucide-react'

export default function PilotoPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    enrollments: 0,
    orders: 0,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (session) {
      fetch('/api/piloto/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(() => {})
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Área do Piloto</h1>
        <p className="text-gray-600">Bem-vindo, {session.user?.name || session.user?.email}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link
          href="/piloto/inscricoes"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
        >
          <Calendar className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Minhas Inscrições</h3>
          <p className="text-gray-600 mb-2">{stats.enrollments} inscrições</p>
          <p className="text-primary-600 font-semibold">Ver todas →</p>
        </Link>

        <Link
          href="/piloto/comprovantes"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
        >
          <FileText className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Comprovantes</h3>
          <p className="text-gray-600 mb-2">Baixar comprovantes</p>
          <p className="text-primary-600 font-semibold">Ver todos →</p>
        </Link>

        <Link
          href="/piloto/pedidos"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
        >
          <ShoppingBag className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Meus Pedidos</h3>
          <p className="text-gray-600 mb-2">{stats.orders} pedidos</p>
          <p className="text-primary-600 font-semibold">Ver todos →</p>
        </Link>

        <Link
          href="/piloto/perfil"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
        >
          <User className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Meu Perfil</h3>
          <p className="text-gray-600 mb-2">Editar informações</p>
          <p className="text-primary-600 font-semibold">Editar →</p>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/piloto/inscricoes/nova?tipo=curso"
            className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition text-center"
          >
            Inscrever-se em Curso
          </Link>
          <Link
            href="/piloto/inscricoes/nova?tipo=trackday"
            className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition text-center"
          >
            Inscrever-se em Trackday
          </Link>
          <Link
            href="/piloto/inscricoes/nova?tipo=championship"
            className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition text-center"
          >
            Inscrever-se no Campeonato
          </Link>
        </div>
      </div>
    </div>
  )
}
