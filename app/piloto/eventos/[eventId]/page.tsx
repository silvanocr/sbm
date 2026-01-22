import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import EventRegistrationForm from '@/components/piloto/EventRegistrationForm'
import { Calendar, MapPin, DollarSign, Users } from 'lucide-react'

export default async function EventRegistrationPage({
  params,
}: {
  params: { eventId: string }
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const event = await prisma.event.findUnique({
    where: { id: params.eventId },
  })

  if (!event || !event.active) {
    redirect('/piloto/eventos')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) {
    redirect('/login')
  }

  // Verificar se já está inscrito
  const existingRegistration = await prisma.eventRegistration.findFirst({
    where: {
      userId: user.id,
      eventId: event.id,
      status: { in: ['pending', 'paid'] },
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {event.image && (
            <div className="relative w-full h-64">
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
            {event.description && (
              <p className="text-gray-600 mb-6">{event.description}</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-brand-yellow" />
                <div>
                  <p className="text-sm text-gray-500">Data do Evento</p>
                  <p className="font-semibold">
                    {format(new Date(event.eventDate), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              </div>
              {event.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-brand-yellow" />
                  <div>
                    <p className="text-sm text-gray-500">Local</p>
                    <p className="font-semibold">{event.location}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-brand-yellow" />
                <div>
                  <p className="text-sm text-gray-500">Valor</p>
                  <p className="font-semibold text-2xl">R$ {event.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-brand-yellow" />
                <div>
                  <p className="text-sm text-gray-500">Vagas</p>
                  <p className="font-semibold">
                    {event.currentParticipants} / {event.maxParticipants || '∞'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {existingRegistration ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Você já está inscrito neste evento</h2>
            <p className="text-gray-600 mb-4">
              Status: {existingRegistration.status === 'paid' ? 'Pago' : 'Pendente'}
            </p>
            <a
              href="/piloto"
              className="text-brand-yellow hover:text-brand-yellow-dark font-semibold"
            >
              Ver minha inscrição →
            </a>
          </div>
        ) : (
          <EventRegistrationForm event={event} user={user} />
        )}
      </div>
    </div>
  )
}
