import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sul Brasileiro de Motovelocidade
          </h1>
          <p className="text-xl mb-8 text-gray-100">
            O maior campeonato de motovelocidade do sul do Brasil. 
            Participe de cursos, trackdays e etapas do campeonato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/piloto"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              Área do Piloto
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/noticias"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
            >
              Ver Notícias
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
