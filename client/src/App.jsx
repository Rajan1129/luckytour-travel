import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import { EnquiryProvider } from './hooks/useEnquiryModal.jsx';
import { DataProvider } from './context/DataContext.jsx';
import Home from './pages/Home.jsx';
import { landingPages } from './data/landingPages.js';

const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const TourPackages = lazy(() => import('./pages/TourPackages.jsx'));
const Destinations = lazy(() => import('./pages/Destinations.jsx'));
const Fleet = lazy(() => import('./pages/Fleet.jsx'));
const TaxiServices = lazy(() => import('./pages/TaxiServices.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const info = (n) => lazy(() => import('./pages/Info.jsx').then((m) => ({ default: m[n] })));
const About = info('About'), Reviews = info('Reviews'), Contact = info('Contact'), Guides = info('Guides'), Privacy = info('Privacy'), Terms = info('Terms'), NotFound = info('NotFound');

export default function App() {
  return (
    <DataProvider>
      <EnquiryProvider>
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Routes>
            <Route path="admin" element={<Admin />} />
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="taxi-service-himachal-pradesh" element={<TaxiServices />} />
              {Object.keys(landingPages).filter(s => s !== 'taxi-service-himachal-pradesh').map((s) => <Route key={s} path={s} element={<LandingPage />} />)}
              <Route path="himachal-tour-packages" element={<TourPackages />} />
              <Route path="destinations" element={<Destinations />} />
              <Route path="fleet" element={<Fleet />} />
              <Route path="about" element={<About />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="contact" element={<Contact />} />
              <Route path="travel-guides" element={<Guides />} />
              <Route path="privacy-policy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </EnquiryProvider>
    </DataProvider>
  );
}
