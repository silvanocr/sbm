import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, MapPin, DollarSign } from 'lucide-react'

export default async function EventosPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const events = await prisma.event.findMany({
    where: {
      active: true,
      registrationDeadline: {
        gte: new Date(),
      },
    },
    orderBy: { eventDate: 'asc' },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Eventos Disponíveis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {event.image && (
              <div className="relative w-full h-48">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{event.name}</h3>
              {event.description && (
                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
              )}
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(event.eventDate), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  R$ {event.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  Inscrições: {event._count.registrations} / {event.maxParticipants || '∞'}
                </div>
              </div>

              <Link
                href={`/piloto/eventos/${event.id}`}
                className="block w-full bg-brand-yellow text-brand-black text-center py-2 rounded-lg font-semibold hover:bg-brand-yellow-dark transition"
              >
                Inscrever-se
              </Link>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum evento disponível no momento.</p>
        </div>
      )}
    </div>
  )
}
