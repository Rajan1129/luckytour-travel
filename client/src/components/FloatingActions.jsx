import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { SITE, whatsappLink } from '../config/site.js';
import { useEnquiry } from '../hooks/useEnquiryModal.jsx';

export default function FloatingActions() {
  const { openEnquiry } = useEnquiry();
  const wa = whatsappLink();
  const item = 'flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold';
  return (
    <div className="glass fixed inset-x-0 bottom-0 z-40 flex border-x-0 border-b-0 bg-surface/90 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <a href={`tel:${SITE.phones[0].tel}`} className={`${item} text-mint`}><Phone size={20} aria-hidden="true" />Call Now</a>
      {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className={`${item} text-ink`}><MessageCircle size={20} aria-hidden="true" />WhatsApp</a>}
      <button type="button" onClick={() => openEnquiry()} className={`${item} bg-amber-deep text-amber`}><CalendarCheck size={20} aria-hidden="true" />Book Taxi</button>
    </div>
  );
}
