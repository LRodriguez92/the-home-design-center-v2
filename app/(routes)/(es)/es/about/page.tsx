import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import heroImage from '@/public/images/heroes/about-hero.webp'

export const metadata: Metadata = {
  title: 'Sobre Nosotros - The Home Design Center',
  description: 'Conozca The Home Design Center y nuestro compromiso con la transformación de casas en hogares de ensueño desde 2005.',
}

export default function AboutPage() {
  return (
    <main className="bg-[#0F0F0F] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] bg-[#1C1F33]">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Sobre The Home Design Center"
            priority
            placeholder="blur"
            className="brightness-[.6] object-cover"
            sizes="100vw"
            quality={100}
            fill
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6">
            Sobre The Home Design Center
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl">
            Transformando casas en hogares de ensueño desde 2014
          </p>
        </div>
        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-16">
        {/* Our Story Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">Nuestra Historia</h2>
          <div className="space-y-4 text-[#B0B0B0] text-lg">
            <p>
              Fundado en 2014, The Home Design Center comenzó con una visión simple pero poderosa: ayudar a
              los propietarios a transformar sus espacios en refugios personalizados de comodidad y estilo.
              Nuestro viaje comenzó con un pequeño equipo de diseñadores apasionados y se ha convertido en un
              centro de diseño de servicio completo con una reputación de excelencia e innovación.
            </p>
            <p>
              A lo largo de los años, hemos tenido el privilegio de trabajar en innumerables hogares, cada proyecto
              sumando a nuestra experiencia y reforzando nuestro compromiso con la calidad y la satisfacción del
              cliente. Hoy, nos enorgullece ser un nombre líder en diseño de interiores, conocidos por nuestras
              soluciones creativas y atención al detalle.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">Nuestra Misión</h2>
          <div className="space-y-4 text-[#B0B0B0] text-lg">
            <p>
              En The Home Design Center, creemos que todos merecen vivir en un espacio que refleje su
              personalidad y satisfaga sus necesidades. Nuestra misión es empoderar a los propietarios
              con las herramientas, la experiencia y la inspiración para dar vida a sus hogares soñados.
            </p>
            <p>
              Ya sea que busque renovar una sola habitación o embarcarse en una renovación completa del hogar,
              nuestro equipo de diseñadores y artesanos experimentados está aquí para guiarlo en cada paso del
              camino, asegurando que su visión se convierta en realidad.
            </p>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">Nuestro Enfoque</h2>
          <div className="space-y-4 text-[#B0B0B0] text-lg">
            <p>
              Creemos en un enfoque colaborativo para el diseño. Nuestro proceso comienza con la comprensión
              de sus necesidades únicas, preferencias de estilo y presupuesto. Luego combinamos nuestra
              experiencia con su visión para crear espacios que no solo son hermosos sino también funcionales
              y reflejo de su estilo de vida.
            </p>
            <p>
              La innovación y la atención al detalle son las piedras angulares de nuestra filosofía de diseño.
              Constantemente exploramos nuevas tecnologías, materiales y tendencias de diseño para aportar
              ideas frescas y emocionantes a cada proyecto. La meticulosa atención al detalle de nuestro
              equipo asegura que cada aspecto de su hogar, desde el diseño general hasta el elemento decorativo
              más pequeño, sea considerado cuidadosamente y ejecutado con experiencia.
            </p>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">Conozca a Nuestro Equipo</h2>
          <div className="space-y-4 text-[#B0B0B0] text-lg">
            <p>
              Nuestro equipo está formado por profesionales apasionados con diversos antecedentes en diseño
              de interiores, arquitectura y artesanía. Dirigidos por nuestro fundador, Leonardo Rodriguez, reunimos
              una gran experiencia y un compromiso compartido con la excelencia.
            </p>
            <p>
              Cada miembro de nuestro equipo está dedicado a mantenerse a la vanguardia de las tendencias
              y tecnologías de diseño, asegurando que podamos ofrecerle las soluciones más innovadoras y
              efectivas para su hogar.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-8 pt-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">¿Listo para Transformar tu Hogar?</h2>
          <p className="text-[#B0B0B0] text-lg max-w-2xl mx-auto">
            Hagamos realidad tu visión. Contáctanos hoy para programar una consulta y dar el primer
            paso hacia tu hogar soñado.
          </p>
          <Link
            href="/es/contact"
            className="inline-flex items-center px-8 py-4 rounded-md bg-[#C9A227] text-[#0F0F0F] text-lg font-semibold hover:bg-[#C9A227]/90 focus:ring-2 focus:ring-offset-2 focus:ring-[#C9A227] focus:outline-none transition duration-300"
          >
            Empezar
          </Link>
        </section>
      </div>
    </main>
  )
} 