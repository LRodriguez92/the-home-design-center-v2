import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import heroImage from '@/public/images/heroes/about-hero.webp'

export const metadata: Metadata = {
  title: 'About Us - The Home Design Center',
  description: 'Learn about The Home Design Center and our commitment to transforming houses into dream homes since 2005.',
}

export default function AboutPage() {
  return (
    <main className="bg-[#0F0F0F] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] bg-[#1C1F33]">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="About The Home Design Center"
            priority
            placeholder="blur"
            className="brightness-50 object-cover"
            sizes="100vw"
            quality={100}
            fill
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6">
            About The Home Design Center
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl">
            Transforming houses into dream homes since 2014
          </p>
        </div>
        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-16">
        {/* Our Story Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">Our Story</h2>
          <div className="space-y-4 text-[#B0B0B0] text-lg">
            <p>
              Founded in 2014, The Home Design Center began with a simple yet powerful vision: to help
              homeowners transform their living spaces into personalized havens of comfort and style.
              Our journey started with a small team of passionate designers and has grown into a full-service
              design center with a reputation for excellence and innovation.
            </p>
            <p>
              Over the years, we&apos;ve had the privilege of working on countless homes, each project adding
              to our expertise and reinforcing our commitment to quality and customer satisfaction. Today,
              we&apos;re proud to be a leading name in home design, known for our creative solutions and
              attention to detail.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">Our Mission</h2>
          <div className="space-y-4 text-[#B0B0B0] text-lg">
            <p>
              At The Home Design Center, we believe that everyone deserves to live in a space that
              reflects their personality and meets their needs. Our mission is to empower homeowners
              with the tools, expertise, and inspiration to bring their dream homes to life.
            </p>
            <p>
              Whether you&apos;re looking to refresh a single room or embark on a full home renovation, our
              team of experienced designers and craftsmen are here to guide you every step of the way,
              ensuring that your vision becomes reality.
            </p>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">Our Approach</h2>
          <div className="space-y-4 text-[#B0B0B0] text-lg">
            <p>
              We believe in a collaborative approach to design. Our process begins with understanding
              your unique needs, style preferences, and budget. We then combine our expertise with your
              vision to create spaces that are not only beautiful but also functional and reflective of your
              lifestyle.
            </p>
            <p>
              Innovation and attention to detail are the cornerstones of our design philosophy. We
              constantly explore new technologies, materials, and design trends to bring fresh, exciting
              ideas to every project. Our team&apos;s meticulous attention to detail ensures that every aspect
              of your home, from the grand layout to the smallest decorative element, is thoughtfully
              considered and expertly executed.
            </p>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">Meet Our Team</h2>
          <div className="space-y-4 text-[#B0B0B0] text-lg">
            <p>
              Our team consists of passionate professionals with diverse backgrounds in interior design,
              architecture, and craftsmanship. Led by our founder, Leonardo Rodriguez, we bring together a wealth
              of experience and a shared commitment to excellence.
            </p>
            <p>
              Each member of our team is dedicated to staying at the forefront of design trends and
              technologies, ensuring that we can offer you the most innovative and effective solutions for
              your home.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-8 pt-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">Ready to Transform Your Home?</h2>
          <p className="text-[#B0B0B0] text-lg max-w-2xl mx-auto">
            Let&apos;s bring your vision to life. Contact us today to schedule a consultation and take the first
            step towards your dream home.
          </p>
          <Link
            href="/en/contact"
            className="inline-flex items-center px-8 py-4 rounded-md bg-[#C9A227] text-[#0F0F0F] text-lg font-semibold hover:bg-[#C9A227]/90 focus:ring-2 focus:ring-offset-2 focus:ring-[#C9A227] focus:outline-none transition duration-300"
          >
            Get Started
          </Link>
        </section>
      </div>
    </main>
  )
} 