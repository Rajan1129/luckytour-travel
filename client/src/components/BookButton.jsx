import { CalendarCheck } from 'lucide-react';
import CTAButton from './CTAButton.jsx';
import { useEnquiry } from '../hooks/useEnquiryModal.jsx';

export default function BookButton({ label = 'Book a Taxi', preset, variant = 'amber', className = '', icon = true }) {
  const { openEnquiry } = useEnquiry();
  return <CTAButton variant={variant} className={className} onClick={() => openEnquiry(preset)}>{icon && <CalendarCheck size={18} aria-hidden="true" />}{label}</CTAButton>;
}
