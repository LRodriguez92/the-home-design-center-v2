export const es = {
  navigation: {
    home: 'Inicio',
    services: 'Servicios',
    projects: 'Proyectos',
    contact: 'Contacto',
    openMenu: 'Abrir menú principal',
    logo: 'Logo de The Home Design Center',
    title: 'The Home Design Center'
  },
  footer: {
    copyright: 'Todos los derechos reservados.'
  },
  home: {
    hero: {
      title: 'Transforma tu Espacio',
      subtitle: 'Servicios Expertos de Remodelación para tu Casa Soñada',
      image: 'Interior de casa lujosa',
      buttons: {
        contact: 'Comienza tu Transformación',
        portfolio: 'Explora Nuestro Portafolio'
      }
    },
  },
  services: {
    title: 'Nuestros Servicios',
    subtitle: 'Descubra nuestra amplia gama de servicios de mejoras para el hogar',
    hero: {
      image: 'Trabajadores de la construcción discutiendo un proyecto',
    },
    detailsTitle: 'Detalles del Servicio',
    kitchen: {
      title: 'Remodelación de Cocina',
      description: 'Transforma tu cocina en un espacio funcional y elegante.',
      details: JSON.stringify([
        'Gabinetes e islas personalizados',
        'Encimeras duraderas',
        'Diseños de iluminación moderna',
        'Puertas y cajones de calidad',
        'Hardware premium',
        'Accesorios',
        'Puertas de cierre suave',
        'Cajones de cierre suave'
      ])
    },
    bath: {
      title: 'Remodelación de Baño',
      description: 'Eleva la funcionalidad y el estilo de tu baño con nuestros servicios de remodelación.',
      details: JSON.stringify([
        'Materiales de alta calidad',
        'Accesorios',
        'Diseños personalizados',
        'Soluciones de ahorro de agua',
        'Restauración'
      ])
    },
    design: {
      title: 'Diseño 3D',
      description: 'Visualiza tu nueva cocina antes de ordenar cualquier material con nuestros servicios de diseño 3D.',
      details: JSON.stringify([
        'Mediciones precisas',
        'Renderizados 3D precisos',
        'Consulta de diseño',
        'Visualización 3D realista'
      ])
    },
    lighting: {
      title: 'Iluminación LED',
      description: 'Ilumina tu hogar con soluciones de iluminación LED eficientes y elegantes.',
      details: JSON.stringify([
        'Diseño de iluminación personalizado',
        'Soluciones eficientes en energía',
        'Integración de iluminación inteligente',
        'Iluminación de acento y tarea',
        'Iluminación LED exterior',
        'Servicios de actualización'
      ])
    },
    painting: {
      title: 'Pintura',
      description: 'Mejora la belleza y el ambiente de tu hogar con nuestros servicios integrales de pintura interior.',
      details: JSON.stringify([
        'Preparación minuciosa de superficies',
        'Aplicación de pintura de alta calidad',
        'Instalación de hardware',
        'Pintura de molduras y acabados'
      ])
    },
    wall: {
      title: 'Eliminación de Paredes',
      description: 'Transforma tus espacios eliminando paredes innecesarias para crear un diseño de concepto abierto.',
      details: JSON.stringify([
        'Paredes no estructurales',
        'Consulta de diseño',
        'Gestión eficiente de escombros'
      ])
    },
    flooring: {
      title: 'Pisos',
      description: 'Elige entre una amplia gama de soluciones de pisos para cada habitación de tu hogar.',
      details: JSON.stringify([
        'Baldosa de porcelana',
        'Baldosa cerámica',
        'Madera sólida',
        'Madera laminada',
        'Madera de ingeniería',
        'Vinilo de lujo',
        'Alfombras',
        'Adoquines exteriores'
      ])
    },
    drywall: {
      title: 'Reparación de Paneles de Yeso',
      description: 'Mejora el interior de tu hogar con reparación profesional de paneles de yeso.',
      details: JSON.stringify([
        'Aplicación profesional',
        'Mezcla perfecta',
        'Mejora de ambiente'
      ])
    }
  },
  testimonials: {
    title: 'Lo que Dicen Nuestros Clientes',
    submitButton: 'Enviar tu Reseña',
    submitDialog: {
      title: 'Enviar tu Reseña',
    },
    successMessage: {
      title: '¡Éxito!',
      message: '¡Gracias por tu reseña!',
    },
    items: [
      {
        name: 'Sara Jiménez',
        review: 'The Home Design Center transformó nuestra cocina anticuada en una obra maestra moderna. ¡Su atención al detalle y calidad de trabajo superó nuestras expectativas!',
        rating: 5,
      },
      {
        name: 'Miguel Chen',
        review: '¡No podríamos estar más felices con la renovación de nuestro baño. El equipo fue profesional, eficiente y entregó exactamente lo que imaginamos. ¡Altamente recomendado!',
        rating: 5,
      },
      {
        name: 'Emily Rodríguez',
        review: 'El servicio de diseño 3D fue revolucionario para la renovación de nuestra casa. Nos ayudó a visualizar el resultado final y tomar decisiones con confianza. ¡Gracias, The Home Design Center!',
        rating: 4,
      },
      {
        name: 'David Torres',
        review: 'De principio a fin, el equipo de The Home Design Center fue fantástico. Nos guiaron durante todo el proceso y entregaron una impresionante remodelación de la sala a tiempo y dentro del presupuesto.',
        rating: 5,
      },
    ],
  },
  projects: {
    title: 'Nuestros Proyectos',
    subtitle: 'Ve Nuestro Trabajo en Acción',
    gallery: {
      project: 'Proyecto',
      filterByTag: 'Filtrar por etiqueta',
      viewProject: 'Ver Proyecto',
      tags: {
        kitchen: 'Cocina',
        bathroom: 'Baño',
        livingRoom: 'Sala',
        bedroom: 'Dormitorio',
        wholeHouse: 'Casa Completa',
        office: 'Oficina',
        outdoor: 'Exterior',
        diningRoom: 'Comedor',
      },
    },
  },
  contact: {
    title: 'Contáctanos',
    subtitle: 'Obtén una Consulta Gratuita',
    form: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      company: 'Empresa',
      message: 'Mensaje',
      submit: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado con éxito!',
    },
    info: {
      title: 'Ponte en Contacto',
      description: 'Estamos aquí para responder cualquier pregunta que tengas sobre nuestros servicios. Contáctanos y te responderemos lo antes posible.',
      phone: {
        label: 'Teléfono',
        value: '+1 (407) 807-1328',
      },
      email: {
        label: 'Correo Electrónico',
        value: 'TheHomeDesignCenterOrlando@gmail.com',
      },
      hours: {
        label: 'Horario de Atención',
        value: 'Lunes - Sábado: 9:00 AM - 6:00 PM EST\nDomingo: Cerrado',
      },
      areas: {
        label: 'Áreas de Servicio',
        value: 'Orlando, Casselberry, Winter Park, Oviedo, Winter Garden, Baldwin Park, Windermere, Lake Nona, Altamonte Springs, Maitland, Dr. Phillips, Lake Mary, Longwood, Winter Springs, Sanford, Apopka, Clermont, Kissimmee',
      },
    },
  },
} 