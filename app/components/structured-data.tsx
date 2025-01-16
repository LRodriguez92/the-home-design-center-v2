'use client'

import Script from 'next/script'

interface StructuredDataProps {
  lang: string
}

export default function StructuredData({ lang }: StructuredDataProps) {
  const businessData = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'The Home Design Center',
    image: 'https://hdckitchenandbath.com/images/logo.svg',
    '@id': 'https://hdckitchenandbath.com',
    url: 'https://hdckitchenandbath.com',
    email: 'TheHomeDesignCenterOrlando@gmail.com',
    telephone: '+1 (407) 807-1328',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Orlando',
      addressRegion: 'FL',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5384, // Orlando coordinates
      longitude: -81.3789
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs: [
      'https://www.facebook.com/homedesigncenterorlando/',
      'https://www.instagram.com/the_homedesigncenter/'
    ],
    priceRange: '$$',
    areaServed: [
      'Orlando',
      'Casselberry',
      'Winter Park',
      'Oviedo',
      'Winter Garden',
      'Baldwin Park',
      'Windermere',
      'Lake Nona',
      'Altamonte Springs',
      'Maitland',
      'Dr. Phillips',
      'Lake Mary',
      'Longwood',
      'Winter Springs',
      'Sanford',
      'Apopka',
      'Clermont',
      'Kissimmee'
    ],
    description: lang === 'es' 
      ? 'Transforme su espacio vital con servicios expertos de remodelación'
      : 'Transform your living space with expert remodeling services',
  }

  return (
    <Script id="structured-data" type="application/ld+json">
      {JSON.stringify(businessData)}
    </Script>
  )
} 