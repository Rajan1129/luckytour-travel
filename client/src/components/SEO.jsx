import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE } from '../config/site.js';

export default function SEO({ title, description, path, jsonLd = [], noindex = false }) {
  const { pathname } = useLocation();
  const url = `${SITE.url}${path ?? pathname}`.replace(/(?<!:)\/\/+$/, '/');
  const image = `${SITE.url}${SITE.ogImage}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd.map((obj, i) => <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>)}
    </Helmet>
  );
}

export const localBusinessLd = () => ({
  '@context': 'https://schema.org',
  '@type': ['TaxiService', 'TravelAgency'],
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  alternateName: 'Lucky Taxi Service Una & Amb',
  url: SITE.url,
  image: `${SITE.url}${SITE.ogImage}`,
  logo: `${SITE.url}${SITE.logo}`,
  description: 'Top-rated taxi service in Una, Amb, Amb Andaura railway station, Nangal and Himachal Pradesh. Offering 24/7 local cabs, outstation travel, airport transfers, Shimla & Manali tour packages.',
  telephone: ['+91-9817980599', '+91-9816980599'],
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Net Banking',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    }
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.6888,
    longitude: 76.1557
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality || 'Amb, Una',
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country
  },
  areaServed: [
    { '@type': 'City', name: 'Una' },
    { '@type': 'City', name: 'Amb' },
    { '@type': 'Place', name: 'Amb Andaura Railway Station' },
    { '@type': 'City', name: 'Nangal' },
    { '@type': 'AdministrativeArea', name: 'Himachal Pradesh' },
    { '@type': 'City', name: 'Shimla' },
    { '@type': 'City', name: 'Manali' },
    { '@type': 'City', name: 'Dharamshala' },
    { '@type': 'Airport', name: 'Chandigarh International Airport (IXC)' }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Lucky Tour & Travel Taxi Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Taxi Service in Una' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Taxi Service in Amb' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Amb Andaura Railway Station Taxi Service' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Nangal Taxi Service' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Airport Taxi Service' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Outstation Taxi Service' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shimla Taxi Service' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Manali Taxi Service' } }
    ]
  },
  ...(SITE.googleBusinessUrl ? { sameAs: [SITE.googleBusinessUrl] } : {})
});

export const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE.url}${it.to}` }))
});

export const faqLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
});
