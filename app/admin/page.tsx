import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'
import { Users, Calendar, Package, MessageSquare, DollarSign } from 'lucide-react'

export default async function AdminDashboard() {
  await requireAdmin()

  const [
    totalPilots,
    totalEvents,
    totalProducts,
    unreadMessages,
    totalRevenue,
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'pilot' } }),
    prisma.event.count(),
    prisma.product.count(),
    prisma.message.count({ where: { read: false } }),
    prisma.eventRegistration.aggregate({
      where: { status: 'paid' },
      _sum: { totalPaid: true },
    }),
  ])

  const stats = [
    {
      title: 'Pilotos Cadastrados',
      value: totalPilots,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Eventos Ativos',
      value: totalEvents,
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      title: 'Produtos',
      value: totalProducts,
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: 'Mensagens Não Lidas',
      value: unreadMessages,
      icon: MessageSquare,
      color: 'bg-yellow-500',
    },
    {
      title: 'Receita Total',
      value: `R$ ${(totalRevenue._sum.totalPaid || 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-600',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow p-6 flex items-center gap-4"
            >
              <div className={`${stat.color} p-4 rounded-lg`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
