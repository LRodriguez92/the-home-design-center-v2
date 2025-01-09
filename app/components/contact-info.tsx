'use client'

import { Phone, Mail, Clock } from 'lucide-react'
import { useTheme } from './theme-provider'

export default function ContactInfo() {
  const theme = useTheme()

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-2xl font-semibold mb-4 text-[${theme.colors.primary}]`}>
          Get in Touch
        </h2>
        <p className="text-[#B0B0B0]">
          We&apos;re here to answer any questions you may have about our services. Reach out to us and we&apos;ll respond as soon as we can.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <Phone className={`w-6 h-6 mr-4 text-[${theme.colors.primary}]`} />
          <div>
            <p className="font-medium">Phone</p>
            <a href="tel:+12015550123" className="text-[#B0B0B0] hover:text-[#C9A227] transition-colors">
              +1 (407) 807-1328
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <Mail className={`w-6 h-6 mr-4 text-[${theme.colors.primary}]`} />
          <div>
            <p className="font-medium">Email</p>
            <a href="mailto:TheHomeDesignCenterOrlando@gmail.com" className="text-[#B0B0B0] hover:text-[#C9A227] transition-colors">
              TheHomeDesignCenterOrlando@gmail.com
            </a>
          </div>
        </div>
        <div className="flex items-start">
          <Clock className={`w-6 h-6 mr-4 text-[${theme.colors.primary}] mt-1`} />
          <div>
            <p className="font-medium">Business Hours</p>
            <p className="text-[#B0B0B0]">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className={`text-xl font-semibold mb-2 text-[${theme.colors.primary}]`}>
          Service Areas
        </h3>
        <p className="text-[#B0B0B0]">
          Orlando, Casselberry, Winter Park, Oviedo, Winter Garden, Baldwin Park, Windermere, Lake Nona, Altamonte Springs, Maitland, Dr. Phillips, Lake Mary, Longwood, Winter Springs, Sanford, Apopka, Clermont, Kissimmee
        </p>
      </div>
    </div>
  )
}

