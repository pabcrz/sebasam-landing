const siteUrl = 'https://www.sebasam.online';

export const business = {
  brand: 'SEBASAM',
  descriptor: 'Servicio y Refacciones para Suspensiones de Aire y Muelles.',
  mainMessage: '30 años manteniendo tu unidad en movimiento.',
  trustMessage: 'Tu unidad y tu presupuesto van primero.',
  trustExplanation:
    'No cambiamos piezas por cambiar. Revisamos cada caso, explicamos las opciones y buscamos la mejor solución según las necesidades y el presupuesto del cliente.',
  origin:
    'SEBASAM nació de Sebas, como "Servicio Básico a Suspensiones de Aire y Muelles". Después de 30 años de experiencia, el nombre continúa representando nuestra especialidad y compromiso con cada cliente.',
  url: siteUrl,
  logo: '/brand/sebasam-logo-dark.png',
  mark: '/brand/sebasam-mark-dark.png',
  contacts: {
    whatsapp: {
      label: '55 3623 9346',
      href: 'https://wa.me/525536239346',
      tel: 'tel:+525536239346',
      ariaLabel: 'Contactar a SEBASAM por WhatsApp',
    },
    phone: {
      label: '55 5600 7675',
      href: 'tel:+525556007675',
      ariaLabel: 'Llamar a SEBASAM',
    },
    maps: {
      label: 'Cómo llegar',
      href: 'https://maps.app.goo.gl/mPve4xkMJr73Lxya8',
      ariaLabel: 'Abrir ubicación de SEBASAM en Google Maps',
    },
  },
  address: {
    street: 'Batalla de Casa Blanca 1719B',
    neighborhood: 'Leyes de Reforma 3.ª Sección',
    locality: 'Iztapalapa',
    region: 'CDMX',
    country: 'MX',
    display: 'Batalla de Casa Blanca 1719B, Leyes de Reforma 3.ª Sección, Iztapalapa, CDMX',
  },
  hours: [
    {
      label: 'Lunes a viernes',
      value: '9:00 a. m. - 6:00 p. m.',
      schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      label: 'Sábado',
      value: '9:00 a. m. - 3:00 p. m.',
      schemaDays: ['Saturday'],
      opens: '09:00',
      closes: '15:00',
    },
  ],
  services: [
    'Alineación a ejes traseros',
    'Brio a muelles',
    'Refuerzos',
    'Soldadura',
    'Ajuste de quinta rueda',
  ],
  products: ['Abrazaderas', 'Bujes', 'Perchas', 'Columpios', 'Tensores', 'Balancines'],
  vehicles: [
    'Pickups y camionetas de trabajo',
    'Camiones ligeros y medianos',
    'Rabones, tortones y tándem',
    'Tractocamiones y remolques',
    'Unidades de flotilla mediante programación periódica',
  ],
  vehicleExamples: 'Desde Nissan NP300 hasta Ford F-350, RAM 3500, rabones y tortones.',
} as const;

export const navigation = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Unidades', href: '/#unidades' },
  { label: 'Refacciones', href: '/#refacciones' },
  { label: 'Contacto', href: '/#contacto' },
] as const;

export function routeUrl(pathname = '/') {
  return new URL(pathname, business.url).toString();
}

export function autoRepairJsonLd(pathname = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${routeUrl('/')}#business`,
    name: business.brand,
    description: business.descriptor,
    url: routeUrl(pathname),
    logo: routeUrl(business.logo),
    telephone: '+525536239346',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: business.hours.map((item) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: item.schemaDays,
      opens: item.opens,
      closes: item.closes,
    })),
    sameAs: [business.contacts.maps.href],
  };
}
