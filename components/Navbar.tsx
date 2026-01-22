'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            Sul Brasileiro de Motovelocidade
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary-200 transition">
              Home
            </Link>
            <Link href="/noticias" className="hover:text-primary-200 transition">
              Notícias
            </Link>
            <Link href="/produtos" className="hover:text-primary-200 transition">
              Produtos
            </Link>
            <Link href="/transmissoes" className="hover:text-primary-200 transition">
              Transmissões
            </Link>
            {session ? (
              <>
                <Link href="/piloto" className="hover:text-primary-200 transition flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Área do Piloto
                </Link>
                <button
                  onClick={() => signOut()}
                  className="hover:text-primary-200 transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </>
            ) : (
              <Link href="/login" className="hover:text-primary-200 transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/" className="block hover:text-primary-200 transition">
              Home
            </Link>
            <Link href="/noticias" className="block hover:text-primary-200 transition">
              Notícias
            </Link>
            <Link href="/produtos" className="block hover:text-primary-200 transition">
              Produtos
            </Link>
            <Link href="/transmissoes" className="block hover:text-primary-200 transition">
              Transmissões
            </Link>
            {session ? (
              <>
                <Link href="/piloto" className="block hover:text-primary-200 transition">
                  Área do Piloto
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block hover:text-primary-200 transition"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link href="/login" className="block hover:text-primary-200 transition">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
