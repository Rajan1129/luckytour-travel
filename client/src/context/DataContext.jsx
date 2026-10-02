import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { SITE } from '../config/site.js';
import {
  fleet as initialFleet,
  packages as initialPackages,
  services as initialServices,
  reviews as initialReviews
} from '../data/content.js';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [fleet, setFleet] = useState(initialFleet);
  const [packages, setPackages] = useState(initialPackages);
  const [services, setServices] = useState(initialServices);
  const [reviews, setReviews] = useState(initialReviews);
  const [settings, setSettings] = useState({
    phone1: SITE.phones[0]?.display || '09816 980599',
    phone1Tel: SITE.phones[0]?.tel || '09816980599',
    phone2: SITE.phones[1]?.display || '09817 980599',
    phone2Tel: SITE.phones[1]?.tel || '09817980599',
    whatsapp: SITE.whatsapp || '919816980599',
    address: SITE.plusCode || 'M4C6+54R, Amb Andaura Railway Station Rd, Amb, Himachal Pradesh 177203',
    announcement: '24/7 Vande Bharat pickups & instant cab dispatch available at Amb Andaura Station',
    showAnnouncement: true
  });
  const [loading, setLoading] = useState(true);

  // Fetch all public data from server
  const refreshData = useCallback(async () => {
    try {
      const [fRes, pRes, sRes, rRes, setRes] = await Promise.all([
        fetch(`${SITE.apiUrl}/api/fleet`).catch(() => null),
        fetch(`${SITE.apiUrl}/api/packages`).catch(() => null),
        fetch(`${SITE.apiUrl}/api/services`).catch(() => null),
        fetch(`${SITE.apiUrl}/api/reviews`).catch(() => null),
        fetch(`${SITE.apiUrl}/api/settings`).catch(() => null)
      ]);

      if (fRes?.ok) {
        const j = await fRes.json();
        if (Array.isArray(j.data) && j.data.length > 0) setFleet(j.data);
      }
      if (pRes?.ok) {
        const j = await pRes.json();
        if (Array.isArray(j.data) && j.data.length > 0) setPackages(j.data);
      }
      if (sRes?.ok) {
        const j = await sRes.json();
        if (Array.isArray(j.data) && j.data.length > 0) setServices(j.data);
      }
      if (rRes?.ok) {
        const j = await rRes.json();
        if (Array.isArray(j.data) && j.data.length > 0) {
          // normalize review keys for testimonials component compatibility
          setReviews(
            j.data.map((r) => ({
              id: r._id,
              name: r.name,
              location: r.location,
              rating: r.rating,
              quote: r.comment,
              comment: r.comment,
              trip: r.trip,
              date: r.date,
              isApproved: r.isApproved
            }))
          );
        }
      }
      if (setRes?.ok) {
        const j = await setRes.json();
        if (j.data) setSettings((prev) => ({ ...prev, ...j.data }));
      }
    } catch (err) {
      console.warn('Could not sync with live API, using cached data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Admin API Helpers
  const getAdminToken = () => sessionStorage.getItem('lucky_admin_token') || localStorage.getItem('lucky_admin_token') || '';

  const adminFetch = async (endpoint, options = {}) => {
    const token = getAdminToken();
    const res = await fetch(`${SITE.apiUrl}/api/admin${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': token,
        ...(options.headers || {})
      }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Action failed');
    return data;
  };

  return (
    <DataContext.Provider
      value={{
        fleet,
        packages,
        services,
        reviews,
        settings,
        loading,
        refreshData,
        adminFetch,
        getAdminToken
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useAppData must be used within a DataProvider');
  return ctx;
}
