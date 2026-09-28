import Fleet from '../models/Fleet.js';
import Package from '../models/Package.js';
import Service from '../models/Service.js';
import Review from '../models/Review.js';
import Setting from '../models/Setting.js';

const INITIAL_FLEET = [
  {
    name: 'Maruti Suzuki Ertiga',
    type: 'MPV',
    capacity: '6+1 Seater',
    bags: '3-4 Large Bags',
    ac: true,
    text: 'Most popular family vehicle for Himachal hill tours and outstation routes. Spacious seating with smooth suspension.',
    note: 'Praised for neatness and pristine condition.',
    image: '/images/maruti-suzuki-ertiga.jpg',
    order: 1
  },
  {
    name: 'Toyota Innova Crysta',
    type: 'Premium MPV',
    capacity: '7+1 Seater',
    bags: '4-5 Large Bags',
    ac: true,
    text: 'Gold standard for long distance mountain touring. Captain seats, superior legroom, high safety and hill power.',
    note: 'Preferred for luxury family holidays & VIP travel.',
    image: '/images/toyota-innova-crysta.jpg',
    order: 2
  },
  {
    name: 'Force Urbania',
    type: 'Luxury Van',
    capacity: '10 to 14 Seater',
    bags: '8-10 Large Bags',
    ac: true,
    text: 'Next-generation luxury group travel. Reclining individual bucket seats, dual AC with personal air vents, sealed panoramic windows, and smooth hill cruise.',
    note: 'Ultimate luxury for large families, corporate retreats & pilgrimage groups.',
    image: '/images/force-urbania.jpg',
    order: 3
  },
  {
    name: 'Toyota Innova Hycross',
    type: 'Luxury Hybrid MPV',
    capacity: '7+1 Seater',
    bags: '4-5 Large Bags',
    ac: true,
    text: 'Ultra-modern hybrid touring MPV with whisper-quiet drive, Ottoman recliner seats, ambient lighting, and panoramic comfort for executive trips.',
    note: 'Premium executive comfort with modern aesthetics.',
    image: '/images/toyota-innova-hycross.jpg',
    order: 4
  },
  {
    name: 'Toyota Fortuner',
    type: '4x4 Luxury SUV',
    capacity: '6+1 Seater',
    bags: '4 Large Bags',
    ac: true,
    text: 'Formidable all-terrain 4x4 SUV built to conquer high mountain passes, snowy roads in Spiti, Rohtang, and rugged Himachal trails with sheer authority.',
    note: 'Top pick for high-altitude passes, snow expeditions & VIP arrival.',
    image: '/images/toyota-fortuner.jpg',
    order: 5
  },
  {
    name: 'Mahindra Scorpio-N',
    type: 'All-Terrain SUV',
    capacity: '6+1 Seater',
    bags: '3 Large Bags',
    ac: true,
    text: 'High-stance rugged SUV offering exceptional ground clearance and mountain road stability. Ideal for steep hill ascents and adventurous itineraries.',
    note: 'Commanding road presence & reliable mountain capability.',
    image: '/images/mahindra-scorpio.jpg',
    order: 6
  },
  {
    name: 'Maruti Suzuki Dzire',
    type: 'Sedan',
    capacity: '4+1 Seater',
    bags: '2 Large Bags',
    ac: true,
    text: 'Economical, fuel-efficient, and comfortable sedan for solo travelers, couples, local town errands, and prompt airport drops.',
    note: 'Best choice for budget outstation drops & couples.',
    image: '/images/maruti-suzuki-dzire.jpg',
    order: 7
  },
  {
    name: 'Force Tempo Traveller',
    type: 'Minibus / Traveller',
    capacity: '12 to 17 Seater',
    bags: '10+ Large Bags',
    ac: true,
    text: 'Spacious high-capacity traveller designed for big group holidays, college excursions, weddings, and multi-day temple circuits.',
    note: 'Economical group mobility with dedicated luggage carrier.',
    image: '/images/tempo-traveller.jpg',
    order: 8
  }
];

const INITIAL_PACKAGES = [
  {
    title: 'Shimla Tour Package',
    destination: 'Shimla',
    duration: '2N / 3D',
    highlights: 'The Ridge, Mall Road, Kufri snow point, Jakhoo Temple',
    text: 'Scenic trip to Queen of Hills with comfortable hotel transfers and local sightseeing in clean Ertiga cabs.',
    image: '/images/shimla.jpg',
    to: '/taxi-service-shimla',
    price: '₹7,500 onward',
    order: 1
  },
  {
    title: 'Manali Valley Package',
    destination: 'Manali',
    duration: '3N / 4D',
    highlights: 'Solang Valley, Atal Tunnel, Rohtang Pass, Hadimba Temple',
    text: 'Snow-capped mountain adventure covering Solang Valley sports, Sissu (Lahaul) via Atal Tunnel, and Kasol.',
    image: '/images/manali.jpg',
    to: '/taxi-service-manali',
    price: '₹12,000 onward',
    order: 2
  },
  {
    title: 'Dharamshala & Kangra Package',
    destination: 'Dharamshala',
    duration: '2N / 3D',
    highlights: 'McLeod Ganj, Dalai Lama Temple, Bhagsu Waterfall, HPCA',
    text: 'Cultural and nature retreat in Kangra Valley with panoramic views of snow-clad Dhauladhar mountains.',
    image: '/images/dharamshala.jpg',
    to: '/taxi-service-dharamshala',
    price: '₹8,500 onward',
    order: 3
  },
  {
    title: 'Himachal Grand Circuit',
    destination: 'Himachal Pradesh',
    duration: '6N / 7D',
    highlights: 'Shimla, Kullu, Manali & Dharamshala complete tour',
    text: 'Comprehensive hill holiday covering all premier destinations in Himachal with personalized itinerary.',
    image: '/images/service-tour-package.jpg',
    to: '/himachal-tour-packages',
    price: '₹22,000 onward',
    order: 4
  }
];

const INITIAL_SERVICES = [
  {
    title: 'Taxi Service in Una & Amb',
    tripType: 'Local',
    icon: 'MapPin',
    text: 'Prompt and affordable local cabs across Una, Amb, Dhamandri, and surrounding areas.',
    to: '/taxi-service-in-una',
    image: '/images/service-local-taxi.jpg',
    baseFare: '₹12/km',
    order: 1
  },
  {
    title: 'Amb Andaura Station Cabs',
    tripType: 'Station Pickup',
    icon: 'Train',
    text: 'Direct station pickups for Vande Bharat Express & Himachal Express at Amb Andaura (AADR).',
    to: '/taxi-service-amb-andaura',
    image: '/images/service-railway-station.jpg',
    baseFare: '₹900 fixed',
    order: 2
  },
  {
    title: 'Rental Cabs in Una',
    tripType: 'Local',
    icon: 'Car',
    text: 'Chauffeur-driven daily car rentals, 8hr/80km packages, wedding cars & outstation tours in Una.',
    to: '/rental-cabs-in-una',
    image: '/images/service-local-taxi.jpg',
    baseFare: '₹1,800 / day',
    order: 3
  },
  {
    title: 'Mata Baglamukhi Temple Taxi',
    tripType: 'Temple Yatra',
    icon: 'Sparkles',
    text: 'Dedicated 45-km cabs from Amb Andaura station to Bankhandi with return havan & darshan waiting.',
    to: '/amb-to-baglamukhi-taxi',
    image: '/images/chintpurni.jpg',
    baseFare: '₹1,500 fixed',
    order: 4
  },
  {
    title: 'Outstation Taxi Service',
    tripType: 'Outstation',
    icon: 'Route',
    text: 'Comfortable one-way drops & round trips to Delhi NCR, Chandigarh, Punjab & Himachal hills.',
    to: '/outstation-taxi-service',
    image: '/images/service-outstation.jpg',
    baseFare: '₹13/km',
    order: 5
  },
  {
    title: 'Airport Taxi Service',
    tripType: 'Airport',
    icon: 'Plane',
    text: 'On-time airport transfers for Chandigarh (IXC), Kangra Gaggal (DHM) & Amritsar (ATQ).',
    to: '/airport-taxi-service',
    image: '/images/service-airport.jpg',
    baseFare: '₹2,500 fixed',
    order: 6
  },
  {
    title: 'Nangal Taxi Service',
    tripType: 'Outstation',
    icon: 'Navigation',
    text: 'Cabs for Nangal Dam, Anandpur Sahib, Bhakra Dam, and connecting Himachal routes.',
    to: '/nangal-taxi-service',
    image: '/images/service-nangal.jpg',
    baseFare: '₹1,200 fixed',
    order: 7
  },
  {
    title: 'Dalhousie & Khajjiar Cabs',
    tripType: 'Outstation',
    icon: 'Mountain',
    text: 'Scenic mountain rides to colonial Dalhousie, Khajjiar lake meadow, and Kalatop sanctuary.',
    to: '/dalhousie-cab-service',
    image: '/images/shimla.jpg',
    baseFare: '₹3,800 fixed',
    order: 8
  },
  {
    title: 'Himachal Tour Packages',
    tripType: 'Tour Package',
    icon: 'Compass',
    text: 'Explore Shimla, Manali, Dharamshala, and Kullu with clean family vehicles and expert drivers.',
    to: '/himachal-tour-packages',
    image: '/images/service-tour-package.jpg',
    baseFare: 'All Inclusive',
    order: 9
  }
];

const INITIAL_REVIEWS = [
  {
    name: 'Rajesh Sharma',
    location: 'Delhi',
    rating: 5,
    comment: 'Pristine, sanitized Ertiga waiting right at Amb Andaura station exit when our Vande Bharat arrived. Courteous driver and fair transparent billing.',
    trip: 'Amb Andaura to Chintpurni & Baglamukhi',
    date: 'February 2026',
    order: 1
  },
  {
    name: 'Sunita Mehra',
    location: 'Chandigarh',
    rating: 5,
    comment: 'Booked a 4-day tour to Dharamshala and Dalhousie. Driver was exceptionally safe on narrow hill roads and very accommodating with our elderly parents.',
    trip: 'Una to Dharamshala & Dalhousie',
    date: 'January 2026',
    order: 2
  },
  {
    name: 'Amit Verma',
    location: 'Ludhiana',
    rating: 5,
    comment: 'Best taxi service in Una! Hired Toyota Innova Crysta for our family trip. High vehicle hygiene, no hidden toll extra surprises. 10/10 recommended.',
    trip: 'Una to Manali Holiday',
    date: 'December 2025',
    order: 3
  },
  {
    name: 'Gurpreet Singh',
    location: 'Mohali',
    rating: 5,
    comment: 'Booked Force Urbania for a family wedding in Amb. The vehicle was brand new, bucket seats were ultra-luxurious, and everyone enjoyed the smooth ride.',
    trip: 'Mohali to Amb Wedding Group',
    date: 'March 2026',
    order: 4
  }
];

export async function seedDatabase() {
  try {
    const fleetCount = await Fleet.countDocuments();
    if (fleetCount === 0) {
      await Fleet.insertMany(INITIAL_FLEET);
      console.log('Seeded Fleet collection with initial 8 vehicles');
    }

    const packageCount = await Package.countDocuments();
    if (packageCount === 0) {
      await Package.insertMany(INITIAL_PACKAGES);
      console.log('Seeded Package collection with initial 4 packages');
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(INITIAL_SERVICES);
      console.log('Seeded Service collection with initial 9 services');
    }

    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
      await Review.insertMany(INITIAL_REVIEWS);
      console.log('Seeded Review collection with initial 4 reviews');
    }

    const settingDoc = await Setting.findOne();
    if (!settingDoc) {
      await Setting.create({});
      console.log('Created default Setting document');
    }
  } catch (err) {
    console.error('Database seeding error:', err.message);
  }
}
