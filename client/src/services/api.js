import { SITE } from '../config/site.js';

export async function submitEnquiry(payload) {
  let res;
  try {
    res = await fetch(`${SITE.apiUrl}/api/enquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch {
    throw { message: 'Could not reach the server. Please check your connection or call us.' };
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { message: data.message || 'Could not send your enquiry.', errors: data.errors || {} };
  return data;
}
