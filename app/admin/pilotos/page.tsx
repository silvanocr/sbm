import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Eye, Edit, Trash2 } from 'lucide-react'

export default async function AdminPilotosPage() {
  await requireAdmin()

  const pilots = await prisma.user.findMany({
    where: { role: 'pilot' },
    orderBy: { createdAt: 'desc' },
    include: {
      eventRegistrations: {
        include: {
          event: true,
        },
      },
    },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestão de Pilotos</h1>
        <Link
          href="/admin/pilotos/novo"
          className="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-brand-yellow-dark transition"
        >
          Novo Piloto
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPF
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Eventos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pilots.map((pilot) => (
              <tr key={pilot.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {pilot.photo && (
                      <img
                        src={pilot.photo}
                        alt={pilot.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{pilot.name}</div>
                      {pilot.licenseNumber && (
                        <div className="text-sm text-gray-500">Licença: {pilot.licenseNumber}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pilot.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pilot.cpf || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pilot.eventRegistrations.length} evento(s)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/pilotos/${pilot.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/admin/pilotos/${pilot.id}/editar`}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
