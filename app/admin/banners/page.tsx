import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Image as ImageIcon } from 'lucide-react'

export default async function AdminBannersPage() {
  await requireAdmin()

  const banners = await prisma.banner.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestão de Banners</h1>
        <Link
          href="/admin/banners/novo"
          className="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-brand-yellow-dark transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Banner
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
              <img
                src={banner.imageUrl}
                alt={banner.title || 'Banner'}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${banner.active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                  {banner.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-2">{banner.title || 'Sem título'}</h3>
              <p className="text-sm text-gray-600 mb-2">Posição: {banner.position}</p>
              <p className="text-sm text-gray-600 mb-4">Ordem: {banner.order}</p>
              <Link
                href={`/admin/banners/${banner.id}/editar`}
                className="block w-full bg-brand-yellow text-brand-black text-center py-2 rounded-lg font-semibold hover:bg-brand-yellow-dark transition"
              >
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
