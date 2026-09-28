import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitEnquiry } from '../services/api.js';
import { SITE } from '../config/site.js';
import { useAppData } from '../context/DataContext.jsx';

const TRIP_TYPES = ['Local', 'Outstation', 'Tour Package', 'Airport/Railway Transfer', 'Other'];
const DEFAULT_VEHICLES = [
  'No preference',
  'Maruti Suzuki Ertiga',
  'Toyota Innova Crysta',
  'Force Urbania',
  'Toyota Innova Hycross',
  'Toyota Fortuner',
  'Mahindra Scorpio-N',
  'Maruti Suzuki Dzire',
  'Force Tempo Traveller',
  'Other (mention in message)'
];
const PHONE_RE = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;
const empty = { name: '', phone: '', pickup: '', destination: '', travelDate: '', passengers: '2', vehicle: 'No preference', tripType: 'Outstation', message: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!PHONE_RE.test(v.phone.trim())) e.phone = 'Enter a valid 10-digit phone number.';
  if (v.pickup.trim().length < 2) e.pickup = 'Enter a pickup location.';
  if (v.destination.trim().length < 2) e.destination = 'Enter a destination.';
  if (!v.travelDate) e.travelDate = 'Choose a travel date.';
  else if (new Date(v.travelDate) < new Date(new Date().toDateString())) e.travelDate = 'Travel date cannot be in the past.';
  const n = Number(v.passengers);
  if (!Number.isInteger(n) || n < 1 || n > 60) e.passengers = 'Enter between 1 and 60 passengers.';
  return e;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-dim">{label}</label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-[#ffb4ab]">{error}</p>}
    </div>
  );
}

export default function BookingForm({ preset = {}, compact = false }) {
  const { fleet } = useAppData();
  const vehicleList = fleet && fleet.length > 0 
    ? ['No preference', ...fleet.map((v) => v.name), 'Other (mention in message)']
    : DEFAULT_VEHICLES;

  const [v, setV] = useState({ ...empty, ...preset });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState('');

  useEffect(() => { setV((s) => ({ ...s, ...preset })); }, [JSON.stringify(preset)]); // eslint-disable-line

  const set = (k) => (e) => { setV((s) => ({ ...s, [k]: e.target.value })); if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined })); };
  const props = (k) => ({ id: `f-${k}`, value: v[k], onChange: set(k), 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `f-${k}-err` : undefined, className: 'field' });

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) { document.getElementById(`f-${Object.keys(found)[0]}`)?.focus(); return; }
    setStatus('loading'); setServerMsg('');
    try {
      await submitEnquiry({ ...v, passengers: Number(v.passengers) });
      setStatus('success'); setV({ ...empty });
    } catch (err) {
      setStatus('error'); setServerMsg(err.message); if (err.errors) setErrors(err.errors);
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-mint/30 bg-pine/50 p-8 text-center">
        <CheckCircle2 className="mx-auto text-mint" size={44} aria-hidden="true" />
        <h3 className="mt-3 text-3xl">Enquiry sent</h3>
        <p className="mt-2 text-ink-dim">Thank you. The Lucky Tour & Travel team will contact you to confirm your quote. For a faster reply, call {SITE.phones[0].display}.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-5 font-semibold text-amber underline">Send another enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field id="f-name" label="Full name" error={errors.name}><input {...props('name')} autoComplete="name" placeholder="Your name" /></Field>
      <Field id="f-phone" label="Phone number" error={errors.phone}><input {...props('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="98179 80599" /></Field>
      <Field id="f-pickup" label="Pickup location" error={errors.pickup}><input {...props('pickup')} placeholder="e.g. Dhamandri" /></Field>
      <Field id="f-destination" label="Destination" error={errors.destination}><input {...props('destination')} placeholder="e.g. Shimla, Manali, Dharamshala" /></Field>
      <Field id="f-travelDate" label="Travel date" error={errors.travelDate}><input {...props('travelDate')} type="date" min={new Date().toISOString().slice(0, 10)} /></Field>
      <Field id="f-passengers" label="Number of passengers" error={errors.passengers}><input {...props('passengers')} type="number" min="1" max="60" inputMode="numeric" /></Field>
      <Field id="f-tripType" label="Trip type"><select {...props('tripType')}>{TRIP_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
      <Field id="f-vehicle" label="Vehicle preference"><select {...props('vehicle')}>{vehicleList.map((t) => <option key={t}>{t}</option>)}</select></Field>
      {!compact && <div className="sm:col-span-2"><Field id="f-message" label="Message (optional)"><textarea {...props('message')} rows={3} maxLength={1000} placeholder="Stops, luggage, return date…" /></Field></div>}
      <div className="sm:col-span-2">
        {status === 'error' && (
          <p role="alert" className="mb-3 flex items-start gap-2 rounded-xl bg-[#93000a]/40 p-3 text-sm text-[#ffdad6]"><AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />{serverMsg} You can also call {SITE.phones[0].display}.</p>
        )}
        <button type="submit" disabled={status === 'loading'} className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-amber-deep px-6 py-3 font-semibold text-amber transition-colors hover:bg-amber-ochre hover:text-white disabled:opacity-60">
          {status === 'loading' ? <><Loader2 className="animate-spin" size={18} aria-hidden="true" /> Sending…</> : 'Request a Taxi Quote'}
        </button>
      </div>
    </form>
  );
}
