'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image: string | null
  category: string
  stock: number
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId)
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { productId, quantity: 1 }]
    })
  }

  const goToCheckout = () => {
    if (cart.length === 0) return
    window.location.href = `/checkout?items=${JSON.stringify(cart)}`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Carregando produtos...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Produtos</h1>
        {cart.length > 0 && (
          <button
            onClick={goToCheckout}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Finalizar Compra ({cart.length})
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {product.image && (
              <div className="relative w-full h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-primary-600">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-sm text-gray-500">
                  Estoque: {product.stock}
                </span>
              </div>
              <button
                onClick={() => addToCart(product.id)}
                disabled={product.stock === 0}
                className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? 'Sem Estoque' : 'Adicionar ao Carrinho'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          Nenhum produto disponível no momento.
        </p>
      )}
    </div>
  )
}
