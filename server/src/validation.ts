export interface EnquiryInput {
  name: string;
  email: string;
  phone?: string;
  service: string;
  model?: string;
  message: string;
  honeypot?: string;
}

export const ALLOWED_SERVICES = ['generator-repairs', 'generator-servicing', 'fault-finding', 'general'] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiry(input: unknown, allowedServices: readonly string[] = ALLOWED_SERVICES) {
  const errors: Record<string, string[]> = {};
  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return { ok: false as const, errors: { form: ['Invalid request body'] } };
  }
  const o = input as Record<string, unknown>;
  const name = typeof o.name === 'string' ? o.name.trim() : '';
  const email = typeof o.email === 'string' ? o.email.trim() : '';
  const phone = typeof o.phone === 'string' ? o.phone.trim() : '';
  const service = typeof o.service === 'string' ? o.service.trim() : '';
  const model = typeof o.model === 'string' ? o.model.trim() : '';
  const message = typeof o.message === 'string' ? o.message.trim() : '';
  const honeypot = typeof o.honeypot === 'string' ? o.honeypot : '';

  if (!name || name.length < 1 || name.length > 100) errors.name = ['Name is required (1-100 chars)'];
  if (!email || email.length > 200 || !EMAIL_RE.test(email)) errors.email = ['Valid email is required'];
  if (phone.length > 50) errors.phone = ['Phone too long'];
  if (!service || !allowedServices.includes(service)) errors.service = ['Unknown service'];
  if (model.length > 150) errors.model = ['Model too long'];
  if (!message || message.length < 1 || message.length > 2000) errors.message = ['Message is required (1-2000 chars)'];
  if (honeypot.trim() !== '') errors.honeypot = ['Rejected'];

  if (Object.keys(errors).length > 0) return { ok: false as const, errors };
  const data: EnquiryInput = { name, email, service, message };
  if (phone) data.phone = phone;
  if (model) data.model = model;
  if (honeypot) data.honeypot = honeypot;
  return { ok: true as const, data };
}
