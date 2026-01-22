import Link from 'next/link'
import { Facebook, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sul Brasileiro de Motovelocidade</h3>
            <p className="text-gray-400">
              O maior campeonato de motovelocidade do sul do Brasil
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="hover:text-white transition">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-white transition">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/transmissoes" className="hover:text-white transition">
                  Transmissões
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Área do Piloto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/piloto" className="hover:text-white transition">
                  Minha Conta
                </Link>
              </li>
              <li>
                <Link href="/piloto/inscricoes" className="hover:text-white transition">
                  Inscrições
                </Link>
              </li>
              <li>
                <Link href="/piloto/comprovantes" className="hover:text-white transition">
                  Comprovantes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-yellow transition">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-brand-yellow transition">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-brand-yellow transition">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sul Brasileiro de Motovelocidade. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
