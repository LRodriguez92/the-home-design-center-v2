import { Metadata } from 'next'
import ContactForm from '@/app/components/contact-form'
import ContactInfo from '@/app/components/contact-info'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Contact Us | The Home Design Center',
  description: 'Get in touch with The Home Design Center for all your home renovation and design needs.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5]">
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image
          src="/images/heroes/contact.jpg"
          alt="Elegant interior design"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-[#B0B0B0] mb-8 max-w-3xl">
            We&apos;re here to help you transform your living space. Reach out to us for any questions, consultations, or to start your next project.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

