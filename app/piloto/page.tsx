import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { User, Calendar, DollarSign, Upload } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import PhotoUpload from '@/components/piloto/PhotoUpload'

export default async function PilotoPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      eventRegistrations: {
        include: {
          event: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!user) {
    redirect('/login')
  }

  const totalPaid = user.eventRegistrations
    .filter(r => r.status === 'paid')
    .reduce((sum, r) => sum + r.totalPaid, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Área do Piloto</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Perfil */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              {user.photo ? (
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={user.photo}
                    alt={user.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <PhotoUpload userId={user.id} currentPhoto={user.photo} />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Nome</label>
                <p className="font-semibold">{user.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-semibold">{user.email}</p>
              </div>
              {user.cpf && (
                <div>
                  <label className="text-sm text-gray-500">CPF</label>
                  <p className="font-semibold">{user.cpf}</p>
                </div>
              )}
              {user.phone && (
                <div>
                  <label className="text-sm text-gray-500">Telefone</label>
                  <p className="font-semibold">{user.phone}</p>
                </div>
              )}
              {user.licenseNumber && (
                <div>
                  <label className="text-sm text-gray-500">Número da Licença</label>
                  <p className="font-semibold">{user.licenseNumber}</p>
                </div>
              )}
            </div>

            <Link
              href="/piloto/editar"
              className="block mt-6 w-full bg-brand-yellow text-brand-black text-center py-2 rounded-lg font-semibold hover:bg-brand-yellow-dark transition"
            >
              Editar Perfil
            </Link>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-8 h-8 text-brand-yellow" />
                <div>
                  <p className="text-sm text-gray-500">Eventos Inscritos</p>
                  <p className="text-2xl font-bold">{user.eventRegistrations.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Pago</p>
                  <p className="text-2xl font-bold">R$ {totalPaid.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Próximo Evento</p>
                  <p className="text-lg font-bold">
                    {user.eventRegistrations.find(r => r.status === 'paid' && new Date(r.event.eventDate) > new Date())?.event.name || 'Nenhum'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Eventos Disponíveis */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Eventos Disponíveis</h2>
              <Link
                href="/piloto/eventos"
                className="text-brand-yellow hover:text-brand-yellow-dark font-semibold"
              >
                Ver Todos
              </Link>
            </div>
            <EventosList />
          </div>

          {/* Histórico de Inscrições */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Histórico de Inscrições</h2>
            {user.eventRegistrations.length === 0 ? (
              <p className="text-gray-500">Nenhuma inscrição ainda.</p>
            ) : (
              <div className="space-y-4">
                {user.eventRegistrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{registration.event.name}</h3>
                        <p className="text-sm text-gray-600">
                          {format(new Date(registration.event.eventDate), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Valor: R$ {registration.totalPaid.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          registration.status === 'paid' ? 'bg-green-100 text-green-800' :
                          registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {registration.status === 'paid' ? 'Pago' :
                           registration.status === 'pending' ? 'Pendente' :
                           'Cancelado'}
                        </span>
                        {registration.receiptUrl && (
                          <a
                            href={registration.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-2 text-sm text-brand-yellow hover:underline"
                          >
                            Ver Comprovante
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

async function EventosList() {
  const events = await prisma.event.findMany({
    where: {
      active: true,
      registrationDeadline: {
        gte: new Date(),
      },
    },
    orderBy: { eventDate: 'asc' },
    take: 3,
  })

  if (events.length === 0) {
    return <p className="text-gray-500">Nenhum evento disponível no momento.</p>
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Link
          key={event.id}
          href={`/piloto/eventos/${event.id}`}
          className="block border border-gray-200 rounded-lg p-4 hover:border-brand-yellow transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{event.name}</h3>
              <p className="text-sm text-gray-600">
                {format(new Date(event.eventDate), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {event.location && `${event.location} • `}
                R$ {event.price.toFixed(2)}
              </p>
            </div>
            <span className="bg-brand-yellow text-brand-black px-3 py-1 rounded-full text-sm font-semibold">
              Inscrever-se
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
