// Runs before `vite build`. Set VITE_SITE_URL in the build environment (Vercel).
import { writeFileSync, mkdirSync } from 'node:fs';

const site = (process.env.VITE_SITE_URL || 'https://www.your-domain.com').replace(/\/$/, '');
const paths = [
  '/',
  '/taxi-service-in-una',
  '/taxi-service-in-amb',
  '/taxi-service-amb-andaura',
  '/rental-cabs-in-una',
  '/nangal-taxi-service',
  '/airport-taxi-service',
  '/outstation-taxi-service',
  '/taxi-service-shimla',
  '/taxi-service-manali',
  '/taxi-service-dharamshala',
  '/taxi-from-dhamandri',
  '/amb-to-baglamukhi-taxi',
  '/dalhousie-cab-service',
  '/taxi-service-himachal-pradesh',
  '/himachal-tour-packages',
  '/destinations',
  '/fleet',
  '/about',
  '/reviews',
  '/contact',
  '/travel-guides',
  '/privacy-policy',
  '/terms'
];
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
  .map((p) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`;
mkdirSync('public', { recursive: true });
writeFileSync('public/sitemap.xml', xml);

// robots.txt
const robotsTxt = `# robots.txt for Lucky Tour & Travel
User-agent: *
Allow: /

# Explicitly welcome major search engines and AI crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

Sitemap: ${site}/sitemap.xml
`;
writeFileSync('public/robots.txt', robotsTxt);

// llms.txt (standard LLM summary index)
const llmsTxt = `# Lucky Tour & Travel

> Lucky Tour & Travel is a 5.0-star rated local and outstation taxi service based in Tehsil Amb, District Una, Himachal Pradesh 174303. Providing 24/7 taxi booking in Una, Amb, Amb Andaura Railway Station (Vande Bharat Express connecting cabs), Nangal, Chandigarh Airport transfers, outstation cab hire, and Himachal tour packages (Shimla, Manali, Dharamshala).

## Business & Contact Details
- Brand: Lucky Tour & Travel
- Tagline: Taxi Service in Una, Amb & Himachal Pradesh
- Phone / Hotline: +91 9816980599 / +91 9817980599
- WhatsApp: +91 9816980599 (Direct instant booking)
- Head Office: Tehsil & VPO Dhamandri, Amb, District Una, Himachal Pradesh 174303
- Plus Code: H68X+F3 Dhamandri, Himachal Pradesh
- Google Business Profile: 5.0 / 5.0 Star Rating
- Fleet: Maruti Suzuki Ertiga (Clean, spacious 6-seater, AC, luggage carrier) and comfortable sedans
- Service Hours: 24/7 Open every day (Monday to Sunday)
- Payment Accepted: Cash, UPI (GPay, PhonePe, Paytm), Net Banking

## Key Services & URLs
- [Taxi Service in Una](${site}/taxi-service-in-una): 24/7 local taxi booking across Una town, Una Himachal Railway Station (UHL), Mehatpur, and outstation trips.
- [Taxi Service in Amb](${site}/taxi-service-in-amb): Local cabs in Amb, Amb taxi stand, Chintpurni temple darshan, and surrounding Himachal villages.
- [Amb Andaura Railway Station Taxi Service](${site}/taxi-service-amb-andaura): Dedicated taxi pickups for passengers arriving on the New Delhi - Amb Andaura Vande Bharat Express (22447/22448) and Himachal Express.
- [Nangal Taxi Service](${site}/nangal-taxi-service): 24/7 cabs in Nangal Dam, Nangal railway station, Anandpur Sahib, Bhakra Dam, and Himachal border connections.
- [Airport Taxi Service](${site}/airport-taxi-service): On-time airport transfers for Chandigarh International Airport (IXC), Kangra Gaggal Airport (DHM), and Amritsar Airport (ATQ).
- [Outstation Taxi Service](${site}/outstation-taxi-service): One-way and round-trip outstation cabs to Delhi NCR, Chandigarh, Punjab, and Himachal Pradesh.
- [Shimla Taxi Service](${site}/taxi-service-shimla): Comfortable cabs to Shimla, Mall Road, Kufri snow point, Mashobra, and Narkanda.
- [Manali Taxi Service](${site}/taxi-service-manali): Scenic mountain rides to Manali, Solang Valley, Atal Tunnel, Sissu, and Rohtang Pass.
- [Himachal Tour Packages](${site}/himachal-tour-packages): Multi-day family, honeymoon, and group travel packages across Himachal Pradesh.
- [Our Taxi Fleet](${site}/fleet): Explore our complete vehicle lineup including Force Urbania, Toyota Innova Crysta, Fortuner, Scorpio-N, Ertiga, and Tempo Traveller.
- [Himachal Destinations](${site}/destinations): Route guides, distances, and cab bookings for Shimla, Manali, Dharamshala, Chintpurni, and Chandigarh.
- [Amb to Baglamukhi Temple Taxi](${site}/amb-to-baglamukhi-taxi): Dedicated cabs from Amb & Amb Andaura station (AADR) to Maa Baglamukhi Temple Bankhandi with return havan/darshan waiting packages.
- [Dalhousie Cab Service](${site}/dalhousie-cab-service): Sightseeing and outstation taxi service to Dalhousie, Khajjiar lake, Kalatop, and Chamba.

## Optional & Deep Information
- [Full Context & FAQs](${site}/llms-full.txt): Comprehensive service guides, route distances, fares guide, and complete FAQ repository.
`;
writeFileSync('public/llms.txt', llmsTxt);
writeFileSync('public/llm.txt', llmsTxt);

// llms-full.txt (complete information for LLMs & AI search engines)
const llmsFullTxt = `# Lucky Tour & Travel — Full Context, Service Directory & FAQ Knowledge Base

## 1. Overview
Lucky Tour & Travel is a premier passenger transport and taxi service company headquartered at Amb Andaura Railway Station Rd, Amb, District Una, Himachal Pradesh (PIN: 177203, Plus Code: M4C6+54R).
Holding a verified 5.0-star rating on Google, the service is renowned for neat, clean vehicles (including Maruti Suzuki Ertiga, Toyota Innova Crysta, Force Urbania, Fortuner, Scorpio-N), smooth driving, punctuality, and courteous local hill chauffeurs.

Contact Numbers:
- Primary Phone: +91 9816980599
- Secondary Phone: +91 9817980599
- WhatsApp: https://wa.me/919816980599
- Website: ${site}

Operating Hours: 24 Hours a day, 7 days a week (24/7).

---

## 2. Core Service Hubs & Offerings

### Taxi Service in Una, Himachal Pradesh
- Gateway to Himachal Pradesh.
- Coverage: Una city center, Mehatpur industrial area, Santokhgarh, Gagret, Bangana, and Una Himachal Railway Station (UHL).
- Services: Doorstep pickups, round-the-clock local runs, hospital transfers, and intercity trips to Chandigarh, Mohali, Panchkula, and Delhi.

### Taxi Service in Amb, Himachal Pradesh
- Local base in Tehsil Amb.
- Coverage: Amb town, Amb taxi stand, Dhamandri, Nehri, Kalruhi, Pragpur heritage village, and Chintpurni road.
- Specialties: Immediate local dispatch, temple pilgrimage taxis (Mata Chintpurni Devi Ji darshan), and emergency transport.

### Taxi Service at Amb Andaura Railway Station (AADR)
- Crucial transit terminus in Himachal Pradesh for the Northern Railway.
- Train Connectivity: Synchronized pickups for New Delhi – Amb Andaura Vande Bharat Express (Train 22447 / 22448), Himachal Express (Train 14053 / 14054), and Daulatpur Chowk passenger trains.
- Direct Drops: Immediate transfers upon arrival to Chintpurni (25 km), Jwalamukhi (50 km), Kangra / Dharamshala / McLeod Ganj, Palampur, Una, and Shimla.
- Zero wait times: Cabs parked at station exit ready upon train arrival.

### Rental Cabs & Car Rental in Una
- Hourly & daily car rental packages (4 hr / 40 km, 8 hr / 80 km, full day).
- 100% chauffeur-driven cars across Una, Mehatpur, Amb, and Gagret.
- Fleet: Maruti Ertiga, Toyota Innova Crysta & Hycross, Toyota Fortuner, and Force Urbania for local business, family functions, weddings, and outstation tours.

### Nangal Taxi Service
- Hub: Nangal Dam, Punjab / Himachal border.
- Sightseeing & Pilgrimage: Cabs for Nangal Dam, Bhakra Dam, Sri Anandpur Sahib (Takht Sri Kesgarh Sahib), and Naina Devi Ji.
- Outstation: Connecting Nangal Dam railway station (NLDM) to Bilaspur, Mandi, Kullu, Manali, and Shimla.

### Airport Taxi Service
- Punctual airport transfers with flight tracking and 15-minute advance arrival:
  1. Chandigarh International Airport (IXC) — Approx 2.5 to 3 hours from Una/Amb.
  2. Kangra Airport / Gaggal Airport Dharamshala (DHM) — Approx 2.5 to 3 hours.
  3. Sri Guru Ram Dass Jee International Airport Amritsar (ATQ) — Approx 3.5 to 4 hours.

### Outstation Taxi Service
- Flexible one-way drop-offs and multi-day round trips.
- Key routes: Una/Amb to Delhi NCR (Gurgaon, Noida, Delhi Airport), Chandigarh Tri-city, Ludhiana, Jalandhar, Amritsar, Haridwar, Rishikesh, Dehradun, and hill stations.

### Shimla Taxi Service
- Sightseeing routes covering Shimla Mall Road, The Ridge, Lakkar Bazaar, Jakhoo Temple, Christ Church, Indian Institute of Advanced Study, Kufri snow point, Mashobra, and Narkanda.
- Skilled mountain drivers experienced with hill hairpin bends and changing weather.

### Manali Taxi Service
- Multi-day tour packages covering Kullu, Manali town, Hadimba Temple, Vashisht hot springs, Solang Valley adventure sports, Atal Tunnel (Rohtang), Sissu in Lahaul Valley, and Kasol / Manikaran Sahib.

---

## 3. Fleet & Vehicle Specifications
- Maruti Suzuki Ertiga: Highly praised in customer reviews for neatness and pristine condition. Seats up to 6 passengers comfortably with AC, heating, ample luggage capacity, and optional roof carriers.
- Comfortable Sedans: Suitable for solo travellers, couples, and small families.
- Safety & Hygiene: Sanitized interiors, clean seat covers, working AC/heaters, and experienced non-smoking mountain drivers.

---

## 4. Frequently Asked Questions (FAQ)

Q: How can I book a taxi with Lucky Tour & Travel?
A: Call directly at 09816980599 or 09817980599, send a message on WhatsApp (+91 9816980599), or fill out the enquiry form on ${site}.

Q: Do you offer pickups for the Vande Bharat Express at Amb Andaura?
A: Yes, we specialize in Amb Andaura Railway Station (AADR) pickups for Vande Bharat Express (22447/22448). Drivers coordinate with you before arrival so your cab is waiting at the exit.

Q: Can I book a one-way taxi to Chandigarh Airport or Delhi?
A: Yes, we provide one-way drop fares as well as round trips.

Q: Are your drivers experienced in hill driving?
A: All drivers are seasoned locals with years of expertise navigating Himachal hill highways including Shimla, Manali, Dharamshala, and Spiti routes.

Q: What payment methods are accepted?
A: We accept Cash, UPI (Google Pay, PhonePe, Paytm, BHIM), and direct bank transfers.
`;
writeFileSync('public/llms-full.txt', llmsFullTxt);
writeFileSync('public/llm-full.txt', llmsFullTxt);

console.log('sitemap.xml, robots.txt, llms.txt, and llms-full.txt successfully generated for', site);
