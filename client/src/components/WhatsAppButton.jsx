import { MessageCircle } from 'lucide-react';
import CTAButton from './CTAButton.jsx';
import { whatsappLink } from '../config/site.js';

// Renders nothing until VITE_WHATSAPP_NUMBER is confirmed and set.
export default function WhatsAppButton({ text, label = 'WhatsApp', variant = 'ghost', className = '' }) {
  const href = whatsappLink(text);
  if (!href) return null;
  return <CTAButton href={href} target="_blank" rel="noopener noreferrer" variant={variant} className={className}><MessageCircle size={18} aria-hidden="true" /> {label}</CTAButton>;
}
