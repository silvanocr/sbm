import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-black via-gray-900 to-brand-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sul Brasileiro de <span className="text-brand-yellow italic">Motovelocidade</span>
          </h1>
          <p className="text-xl mb-8 text-gray-100">
            O maior campeonato de motovelocidade do sul do Brasil. 
            Participe de cursos, trackdays e etapas do campeonato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/piloto"
              className="bg-brand-yellow text-brand-black px-8 py-3 rounded-lg font-semibold hover:bg-brand-yellow-dark transition flex items-center justify-center gap-2 shadow-lg"
            >
              Área do Piloto
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/noticias"
              className="bg-transparent border-2 border-brand-yellow text-brand-yellow px-8 py-3 rounded-lg font-semibold hover:bg-brand-yellow hover:text-brand-black transition"
            >
              Ver Notícias
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
