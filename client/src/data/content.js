// Editable content with real high-resolution images for best visual appeal and SEO.
export const services = [
  { id: 'local-una-amb', icon: 'MapPin', title: 'Taxi Service in Una & Amb', text: 'Prompt and affordable local cabs across Una, Amb, Dhamandri, and surrounding areas.', tripType: 'Local', to: '/taxi-service-in-una', image: '/images/service-local-taxi.jpg' },
  { id: 'station-andaura', icon: 'Train', title: 'Amb Andaura Station Cabs', text: 'Direct station pickups for Vande Bharat Express & Himachal Express at Amb Andaura (AADR).', tripType: 'Station Pickup', to: '/taxi-service-amb-andaura', image: '/images/service-railway-station.jpg' },
  { id: 'rental-una', icon: 'Car', title: 'Rental Cabs in Una', text: 'Chauffeur-driven daily car rentals, 8hr/80km packages, wedding cars & outstation tours in Una.', tripType: 'Local', to: '/rental-cabs-in-una', image: '/images/service-local-taxi.jpg' },
  { id: 'baglamukhi', icon: 'Sparkles', title: 'Mata Baglamukhi Temple Taxi', text: 'Dedicated 45-km cabs from Amb Andaura station to Bankhandi with return havan & darshan waiting.', tripType: 'Temple Yatra', to: '/amb-to-baglamukhi-taxi', image: '/images/chintpurni.jpg' },
  { id: 'outstation', icon: 'Route', title: 'Outstation Taxi Service', text: 'Comfortable one-way drops & round trips to Delhi NCR, Chandigarh, Punjab & Himachal hills.', tripType: 'Outstation', to: '/outstation-taxi-service', image: '/images/service-outstation.jpg' },
  { id: 'airport', icon: 'Plane', title: 'Airport Taxi Service', text: 'On-time airport transfers for Chandigarh (IXC), Kangra Gaggal (DHM) & Amritsar (ATQ).', tripType: 'Airport', to: '/airport-taxi-service', image: '/images/service-airport.jpg' },
  { id: 'nangal', icon: 'Navigation', title: 'Nangal Taxi Service', text: 'Cabs for Nangal Dam, Anandpur Sahib, Bhakra Dam, and connecting Himachal routes.', tripType: 'Outstation', to: '/nangal-taxi-service', image: '/images/service-nangal.jpg' },
  { id: 'dalhousie', icon: 'Mountain', title: 'Dalhousie & Khajjiar Cabs', text: 'Scenic mountain rides to colonial Dalhousie, Khajjiar lake meadow, and Kalatop sanctuary.', tripType: 'Outstation', to: '/dalhousie-cab-service', image: '/images/shimla.jpg' },
  { id: 'tour', icon: 'Compass', title: 'Himachal Tour Packages', text: 'Explore Shimla, Manali, Dharamshala, and Kullu with clean family vehicles and expert drivers.', tripType: 'Tour Package', to: '/himachal-tour-packages', image: '/images/service-tour-package.jpg' }
];

export const destinations = [
  { id: 'shimla', name: 'Shimla', text: "Queen of Hills - Mall Road, Kufri and scenic mountain viewpoints.", to: '/taxi-service-shimla', image: '/images/shimla.jpg', hue: 150 },
  { id: 'manali', name: 'Manali', text: 'Snow peaks, Solang Valley, Atal Tunnel and mountain adventure.', to: '/taxi-service-manali', image: '/images/manali.jpg', hue: 200 },
  { id: 'dharamshala', name: 'Dharamshala', text: 'Scenic Kangra Valley, HPCA stadium and Dalai Lama Temple in McLeod Ganj.', to: '/taxi-service-dharamshala', image: '/images/dharamshala.jpg', hue: 120 },
  { id: 'chintpurni', name: 'Chintpurni Devi', text: 'Sacred Shaktipeeth temple darshan cab trips from Amb and Una.', to: '/taxi-service-in-amb', image: '/images/chintpurni.jpg', hue: 45 },
  { id: 'chandigarh', name: 'Chandigarh & Airport', text: 'Convenient one-way drops and airport transfers to IXC and Tri-city.', to: '/airport-taxi-service', image: '/images/chandigarh.jpg', hue: 210 }
];

export const packages = [
  {
    id: 'shimla',
    title: 'Shimla Tour Package',
    destination: 'Shimla',
    duration: '2N / 3D',
    highlights: 'The Ridge, Mall Road, Kufri snow point, Jakhoo Temple',
    text: 'Scenic trip to Queen of Hills with comfortable hotel transfers and local sightseeing in clean Ertiga cabs.',
    image: '/images/shimla.jpg',
    to: '/taxi-service-shimla'
  },
  {
    id: 'manali',
    title: 'Manali Valley Package',
    destination: 'Manali',
    duration: '3N / 4D',
    highlights: 'Solang Valley, Atal Tunnel, Rohtang Pass, Hadimba Temple',
    text: 'Snow-capped mountain adventure covering Solang Valley sports, Sissu (Lahaul) via Atal Tunnel, and Kasol.',
    image: '/images/manali.jpg',
    to: '/taxi-service-manali'
  },
  {
    id: 'dharamshala',
    title: 'Dharamshala & Kangra Package',
    destination: 'Dharamshala',
    duration: '2N / 3D',
    highlights: 'McLeod Ganj, Dalai Lama Temple, Bhagsu Waterfall, HPCA',
    text: 'Cultural and nature retreat in Kangra Valley with panoramic views of snow-clad Dhauladhar mountains.',
    image: '/images/dharamshala.jpg',
    to: '/taxi-service-dharamshala'
  },
  {
    id: 'himachal-circuit',
    title: 'Himachal Grand Circuit',
    destination: 'Himachal Pradesh',
    duration: '6N / 7D',
    highlights: 'Shimla, Kullu, Manali & Dharamshala complete tour',
    text: 'Comprehensive hill holiday covering all premier destinations in Himachal with personalized itinerary.',
    image: '/images/service-tour-package.jpg',
    to: '/himachal-tour-packages'
  }
];

export const fleet = [
  {
    id: 'ertiga',
    name: 'Maruti Suzuki Ertiga',
    type: 'MPV',
    capacity: '6+1 Seater',
    bags: '3-4 Large Bags',
    ac: true,
    text: 'Most popular family vehicle for Himachal hill tours and outstation routes. Spacious seating with smooth suspension.',
    note: 'Praised for neatness and pristine condition.',
    image: '/images/maruti-suzuki-ertiga.jpg'
  },
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    type: 'Luxury MPV',
    capacity: '6+1 / 7+1 Seater',
    bags: '4-5 Large Bags',
    ac: true,
    text: 'Premium luxury and executive travel. Captain seats, unmatched ride comfort on mountain curves, and ample luggage room.',
    note: 'Best for long-distance outstation & luxury tours.',
    image: '/images/toyota-innova-crysta.jpg'
  },
  {
    id: 'force-urbania',
    name: 'Force Urbania',
    type: 'Executive Luxury Van',
    capacity: '10 to 14 Seater',
    bags: 'Spacious Luggage Boot',
    ac: true,
    text: 'Next-gen luxury commuter van with world-class styling, individual reclining captain seats, ambient lighting, and panoramic windows.',
    note: 'Ultimate luxury for VIP delegations & family groups.',
    image: '/images/force-urbania.jpg'
  },
  {
    id: 'innova-hycross',
    name: 'Toyota Innova Hycross',
    type: 'Hybrid Luxury MPV',
    capacity: '7+1 Seater',
    bags: '4-5 Large Bags',
    ac: true,
    text: 'Ultra-refined hybrid luxury MPV featuring Ottoman seating, whisper-quiet cabin, and plush ride quality across hilly roads.',
    note: 'Eco-efficient luxury travel with superior comfort.',
    image: '/images/toyota-innova-hycross.jpg'
  },
  {
    id: 'fortuner',
    name: 'Toyota Fortuner',
    type: 'Premium 4x4 SUV',
    capacity: '6+1 Seater',
    bags: '4 Large Bags',
    ac: true,
    text: 'Mighty, road-commanding SUV built for rugged mountain highways, high-altitude passes, and luxury hill road trips.',
    note: 'Exceptional safety and tough hill performance.',
    image: '/images/toyota-fortuner.jpg'
  },
  {
    id: 'scorpio',
    name: 'Mahindra Scorpio-N',
    type: 'Rugged Mountain SUV',
    capacity: '6+1 Seater',
    bags: '3-4 Bags',
    ac: true,
    text: 'Powerful high-ground-clearance SUV designed to conquer steep Himachal slopes, Rohtang, Spiti Valley, and rural trails.',
    note: 'High torque & stability on tough hill terrains.',
    image: '/images/mahindra-scorpio.jpg'
  },
  {
    id: 'dzire',
    name: 'Maruti Suzuki Dzire',
    type: 'Sedan',
    capacity: '4+1 Seater',
    bags: '2-3 Bags',
    ac: true,
    text: 'Economical and comfortable sedan for couples, solo travellers, local city pickups, and express airport transfers.',
    note: 'Fuel-efficient and budget-friendly choice.',
    image: '/images/maruti-suzuki-dzire.jpg'
  },
  {
    id: 'tempo-traveller',
    name: 'Force Tempo Traveller',
    type: 'Luxury Minibus',
    capacity: '12+1 / 17+1 Seater',
    bags: 'Dedicated Luggage Boot',
    ac: true,
    text: 'Spacious group coach for joint families, pilgrimage yatras to Chintpurni & Jwalamukhi, and corporate hill excursions.',
    note: 'Pushback seats with individual AC vents.',
    image: '/images/tempo-traveller.jpg'
  }
];

export const benefits = [
  { icon: 'Car', title: 'Modern Clean Fleet', desc: 'Sanitised Ertiga, Innova Crysta, Force Urbania & SUVs equipped with climate control.' },
  { icon: 'UserCheck', title: 'Expert Mountain Drivers', desc: 'Locally verified chauffeurs with 10+ years experience navigating steep hill curves.' },
  { icon: 'Sparkles', title: 'Pristine Vehicle Hygiene', desc: 'Thoroughly vacuumed, deodorised, and mechanically inspected prior to every trip.' },
  { icon: 'Compass', title: 'Local Scenic Knowledge', desc: 'Recommendations for the best roadside dhabas, viewpoint stops, and fastest routes.' },
  { icon: 'Route', title: 'Point-to-Point & Tours', desc: 'Flexible packages for temple yatras, outstation drops, and multi-day hill holidays.' },
  { icon: 'PhoneCall', title: 'Instant 24/7 Dispatch', desc: 'Fast coordination with zero waiting for arriving trains at Amb Andaura Station (AADR).' },
  { icon: 'Home', title: 'Family-Safe Mountain Driving', desc: 'Gentle, defensive driving style that keeps children and elders relaxed throughout.' },
  { icon: 'ShieldCheck', title: '100% Upfront Pricing', desc: 'Transparent all-inclusive quotations with no hidden night surcharges or surprise tolls.' }
];

export const steps = [
  {
    title: 'Tell Us Your Trip',
    text: 'Choose your pickup, destination, travel dates, and vehicle preference via phone or our quick online form.',
    image: '/images/how-it-works-step1.jpg'
  },
  {
    title: 'Get Instant Quote & Confirm',
    text: 'Receive a transparent upfront fare quotation with zero hidden charges. Confirm your booking in seconds.',
    image: '/images/how-it-works-step2.jpg'
  },
  {
    title: 'Travel Comfortably',
    text: 'Your verified driver arrives punctually in a sanitised cab. Sit back, relax, and enjoy scenic Himachal roads.',
    image: '/images/how-it-works-step3.jpg'
  }
];

export const reviews = [
  { name: 'RANJNA DEVI', text: 'We have amazing experience with lucky ji. lucky ji drives smoothly. he take care of everything properly. We booked ertiga and the car was also in very good condition. I highly recommend this cab service' },
  { name: 'SHIV KUMAR', text: 'Neat and clean texi lucky tour and travel Best service.' },
  { name: 'MAHAKAL TOUR & TRAVELS', text: 'Gud service neat and clean cabs' }
];

export const serviceArea = ['Una', 'Amb', 'Amb Andaura (AADR)', 'Nangal', 'Dhamandri', 'Chintpurni', 'Shimla', 'Manali', 'Dharamshala', 'Chandigarh Airport'];
