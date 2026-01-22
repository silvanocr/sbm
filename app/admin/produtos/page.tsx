import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Package } from 'lucide-react'

export default async function AdminProdutosPage() {
  await requireAdmin()

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestão de Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-brand-yellow-dark transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Produto
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
            {product.image && (
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-2xl font-bold text-brand-yellow">R$ {product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Estoque: {product.stock}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.active ? 'Ativo' : 'Inativo'}
                </div>
              </div>
              <Link
                href={`/admin/produtos/${product.id}/editar`}
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
