import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEnquiry } from '../hooks/useEnquiryModal.jsx';
import BookingForm from './BookingForm.jsx';

export default function EnquiryModal() {
  const { open, preset, closeEnquiry } = useEnquiry();
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const onKey = (e) => e.key === 'Escape' && closeEnquiry();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus?.(); };
  }, [open, closeEnquiry]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && closeEnquiry()}>
          <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="enq-title" initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} className="glass max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-surface-low p-6 sm:rounded-3xl md:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div><h2 id="enq-title" className="text-3xl">Plan Your Himachal Ride</h2><p className="text-ink-dim">Share your trip details and we will contact you with a quote.</p></div>
              <button type="button" onClick={closeEnquiry} aria-label="Close enquiry form" className="rounded-full bg-surface-high p-2"><X size={20} /></button>
            </div>
            <BookingForm preset={preset} compact />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
