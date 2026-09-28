import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FloatingActions from '../components/FloatingActions.jsx';
import EnquiryModal from '../components/EnquiryModal.jsx';

export default function MainLayout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 0);
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-amber focus:px-4 focus:py-2 focus:text-black">Skip to content</a>
      <Navbar />
      <main id="main"><Outlet /></main>
      <Footer />
      <FloatingActions />
      <EnquiryModal />
    </>
  );
}
