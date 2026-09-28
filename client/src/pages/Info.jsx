import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';
import GlassCard from '../components/GlassCard.jsx';
import MapSection from '../components/MapSection.jsx';
import { ReviewsSection, ContactSection, WhySection } from '../components/sections.jsx';
import { SITE } from '../config/site.js';

export const About = () => (
  <PageShell path="/about" title="About Lucky Tour & Travel | Taxi Service in Amb, Una" description="Lucky Tour & Travel is a premier taxi service based at Amb Andaura Railway Station Rd, Amb, Himachal Pradesh offering local and outstation cabs." h1="About Lucky Tour & Travel"
    intro="Lucky Tour & Travel is a professional taxi service based at Amb Andaura Railway Station Rd, Amb, Himachal Pradesh, serving local and outstation travellers across Una, Kangra, and Himachal." crumbs={[{ name: 'About', to: '/about' }]}>
    <div className="container-x pb-10"><GlassCard className="max-w-3xl p-6 text-lg text-ink-dim">
      <p>We are a top-rated taxi service with verified customer reviews. Travellers trust our clean cabs, smooth driving, punctual pickups, and transparent fares. Explore <Link className="text-amber underline" to="/taxi-service-himachal-pradesh">our taxi services</Link> or <Link className="text-amber underline" to="/contact">contact the team</Link>.</p>
    </GlassCard></div>
    <WhySection />
  </PageShell>
);
export const Reviews = () => (
  <PageShell path="/reviews" title="Customer Reviews | Lucky Tour & Travel" description="Read real reviews for Lucky Tour & Travel, a top-rated taxi service in Amb, Una, Himachal Pradesh." h1="Customer Reviews" crumbs={[{ name: 'Reviews', to: '/reviews' }]}>
    <ReviewsSection full />
  </PageShell>
);
export const Contact = () => (
  <PageShell path="/contact" title="Contact Lucky Tour & Travel | Book a Taxi in Himachal" description="Call or send an enquiry to book a taxi with Lucky Tour & Travel, Amb Andaura Railway Station Rd, Amb, Himachal Pradesh 177203." h1="Contact Lucky Tour & Travel" crumbs={[{ name: 'Contact', to: '/contact' }]}>
    <ContactSection /><MapSection />
  </PageShell>
);
export const Guides = () => (
  <PageShell path="/travel-guides" title="Himachal Travel Guides | Lucky Tour & Travel" description="Travel guides for Himachal Pradesh from Lucky Tour & Travel. Guides are being prepared." h1="Himachal Travel Guides" crumbs={[{ name: 'Travel Guides', to: '/travel-guides' }]}>
    <div className="container-x pb-20"><p className="max-w-2xl text-ink-dim">Guides will appear here. To add one, create an entry in <code>src/data/guides.js</code>. Meanwhile, see <Link className="text-amber underline" to="/taxi-service-himachal-pradesh">taxi service in Himachal Pradesh</Link>.</p></div>
  </PageShell>
);
const Legal = ({ path, title, h1, children }) => (
  <PageShell path={path} title={`${title} | Lucky Tour & Travel`} description={`${title} for the Lucky Tour & Travel website.`} h1={h1} crumbs={[{ name: h1, to: path }]}>
    <div className="container-x max-w-3xl pb-20 text-ink-dim">{children}</div>
  </PageShell>
);
export const Privacy = () => (
  <Legal path="/privacy-policy" title="Privacy Policy" h1="Privacy Policy">
    <p>When you send an enquiry we store the details you enter (name, phone, trip details and message) only to respond to your request. We do not sell your information. To ask for your details to be removed, call {SITE.phones[0].display}. Review this text with the business owner before launch.</p>
  </Legal>
);
export const Terms = () => (
  <Legal path="/terms" title="Terms & Conditions" h1="Terms & Conditions">
    <p>Submitting an enquiry is a request for a quote, not a confirmed booking. Fares, availability and vehicle details are confirmed directly by Lucky Tour & Travel. Review this text with the business owner before launch.</p>
  </Legal>
);
export const NotFound = () => (
  <PageShell path="/404" title="Page not found | Lucky Tour & Travel" description="Page not found." h1="Page not found" crumbs={[{ name: 'Not found', to: '/404' }]}>
    <div className="container-x pb-20"><Link className="text-amber underline" to="/">Back to home</Link></div>
  </PageShell>
);
