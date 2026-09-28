const env = import.meta.env;

export const SITE = {
  name: 'Lucky Tour & Travel',
  tagline: 'Taxi Service in Una, Amb & Himachal Pradesh',
  url: (env.VITE_SITE_URL || 'https://www.your-domain.com').replace(/\/$/, ''),
  apiUrl: (env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, ''),
  phones: [
    { display: '09817 980599', tel: '09817980599' },
    { display: '09816 980599', tel: '09816980599' }
  ],
  whatsapp: (env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  mapsEmbed: env.VITE_GOOGLE_MAPS_EMBED_URL || '',
  googleBusinessUrl: env.VITE_GOOGLE_BUSINESS_URL || '',
  address: { street: 'Amb Andaura Railway Station Rd', locality: 'Amb, District Una', region: 'Himachal Pradesh', postalCode: '177203', country: 'IN' },
  plusCode: 'M4C6+54R, Amb Andaura Railway Station Rd, Amb, Himachal Pradesh 177203',
  rating: '5.0',
  reviewCount: 6,
  logo: '/images/lucky-tour-travel-logo.png',
  ogImage: '/images/og-lucky-tour-travel.jpg'
};

export const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'Taxi Services',
    to: '/taxi-service-himachal-pradesh',
    children: [
      { label: 'Taxi Service in Una', to: '/taxi-service-in-una', desc: 'Local, station & outstation cabs in Una' },
      { label: 'Taxi Service in Amb', to: '/taxi-service-in-amb', desc: 'Amb town & nearby local cabs' },
      { label: 'Amb Andaura Station Taxi', to: '/taxi-service-amb-andaura', desc: 'Vande Bharat & station pickups' },
      { label: 'Rental Cabs in Una', to: '/rental-cabs-in-una', desc: 'Daily car rental & chauffeur cabs' },
      { label: 'Amb to Baglamukhi Temple', to: '/amb-to-baglamukhi-taxi', desc: 'Bankhandi darshan taxi service' },
      { label: 'Dalhousie Cab Service', to: '/dalhousie-cab-service', desc: 'Dalhousie & Khajjiar cabs' },
      { label: 'Airport Taxi Service', to: '/airport-taxi-service', desc: 'Chandigarh & Gaggal airport transfers' },
      { label: 'Outstation Taxi Service', to: '/outstation-taxi-service', desc: 'One-way drops & round trips' },
      { label: 'Nangal Taxi Service', to: '/nangal-taxi-service', desc: 'Nangal Dam & Anandpur Sahib' },
      { label: 'All Taxi Services', to: '/taxi-service-himachal-pradesh', desc: 'Explore all routes & fleet options' }
    ]
  },
  { label: 'Tour Packages', to: '/himachal-tour-packages' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
];

export function whatsappLink(text = 'Hello Lucky Tour & Travel, I would like a taxi quote.') {
  return SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}` : null;
}
