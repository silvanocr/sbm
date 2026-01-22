import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default async function AdminNoticiasPage() {
  await requireAdmin()

  const news = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestão de Notícias</h1>
        <Link
          href="/admin/noticias/nova"
          className="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-brand-yellow-dark transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nova Notícia
        </Link>
      </div>

      <div className="grid gap-6">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex gap-6">
              {item.image && (
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${item.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {item.published ? 'Publicada' : 'Rascunho'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${item.featured ? 'bg-yellow-100 text-yellow-800' : ''}`}>
                      {item.featured ? 'Destaque' : ''}
                    </span>
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{item.content}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {item.author && <span>Por: {item.author}</span>}
                    {item.publishedAt && (
                      <span className="ml-4">
                        Publicado em: {format(new Date(item.publishedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/admin/noticias/${item.id}/editar`}
                    className="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-brand-yellow-dark transition"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
