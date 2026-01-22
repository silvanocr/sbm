import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default async function AdminEventosPage() {
  await requireAdmin()

  const events = await prisma.event.findMany({
    orderBy: { eventDate: 'desc' },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestão de Eventos</h1>
        <Link
          href="/admin/eventos/novo"
          className="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-brand-yellow-dark transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Evento
        </Link>
      </div>

      <div className="grid gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Data:</span>
                    <p className="font-semibold">
                      {format(new Date(event.eventDate), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Valor:</span>
                    <p className="font-semibold">R$ {event.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Inscrições:</span>
                    <p className="font-semibold">
                      {event._count.registrations} / {event.maxParticipants || '∞'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <p className={`font-semibold ${event.active ? 'text-green-600' : 'text-red-600'}`}>
                      {event.active ? 'Ativo' : 'Inativo'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Link
                  href={`/admin/eventos/${event.id}/editar`}
                  className="text-yellow-600 hover:text-yellow-900 p-2"
                >
                  <Edit className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
