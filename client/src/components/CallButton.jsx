import { Phone } from 'lucide-react';
import CTAButton from './CTAButton.jsx';
import { SITE } from '../config/site.js';

export default function CallButton({ index = 0, variant = 'primary', label, className = '' }) {
  const p = SITE.phones[index];
  return (
    <CTAButton href={`tel:${p.tel}`} variant={variant} className={className} aria-label={`Call Lucky Tour & Travel on ${p.display}`}>
      <Phone size={18} aria-hidden="true" /> {label ?? `Call ${p.display}`}
    </CTAButton>
  );
}
