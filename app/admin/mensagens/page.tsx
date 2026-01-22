import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Mail, MailOpen } from 'lucide-react'

export default async function AdminMensagensPage() {
  await requireAdmin()

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Mensagens Recebidas</h1>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`bg-white rounded-lg shadow p-6 ${!message.read ? 'border-l-4 border-brand-yellow' : ''}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {message.read ? (
                    <MailOpen className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Mail className="w-5 h-5 text-brand-yellow" />
                  )}
                  <h3 className="text-lg font-bold">{message.subject}</h3>
                  {!message.read && (
                    <span className="bg-brand-yellow text-brand-black px-2 py-1 rounded text-xs font-semibold">
                      Nova
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  De: {message.name} ({message.email})
                  {message.user && ` - Piloto: ${message.user.name}`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(message.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 whitespace-pre-wrap">{message.message}</p>
            </div>
            {!message.read && (
              <div className="mt-4">
                <button className="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-brand-yellow-dark transition">
                  Marcar como Lida
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
