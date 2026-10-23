export type ServiceSlug = 'generator-repairs' | 'generator-servicing' | 'fault-finding';

export interface Service {
  slug: ServiceSlug;
  route: string;
  title: string;
  short: string;
  description: string;
  symptoms: string[];
  prepare: string[];
  nextSteps: string[];
}

export const services: Service[] = [
  {
    slug: 'generator-repairs',
    route: '/services/generator-repairs',
    title: 'Generator repairs',
    short: 'Starting problems, unexpected shutdowns or a change in performance.',
    description:
      'When a generator stops starting, shuts down unexpectedly or performs differently than usual, describe the fault and speak to Jameric about a repair.',
    symptoms: [
      'Generator will not start or struggles to start',
      'Unexpected shutdowns during use',
      'Changes in performance or output',
      'Unusual noise, smoke or vibration',
      'Warning lights or fault codes',
    ],
    prepare: [
      'Generator make, model and kVA rating',
      'Symptoms and when they occur',
      'Any fault codes or warning lights',
      'Photos or short videos of the issue',
      'Recent service or repair history',
    ],
    nextSteps: [
      'Call to discuss the symptoms and confirm assessment arrangements',
      'Agree on the proposed repair, costs and expected timing',
      'Confirm where and when to bring the equipment',
    ],
  },
  {
    slug: 'generator-servicing',
    route: '/services/generator-servicing',
    title: 'Servicing & maintenance',
    short: 'Give your generator regular attention and confirm its service needs.',
    description:
      'Regular attention helps keep a generator ready when it is needed. Contact Jameric to discuss service needs, usage and maintenance history.',
    symptoms: [
      'Service interval is overdue',
      'Generator used heavily or in demanding conditions',
      'Performance has declined since last service',
      'You are unsure of the last service date',
    ],
    prepare: [
      'Generator make, model and kVA rating',
      'Usage pattern and load requirements',
      'Last service date and work performed',
      'Any concerns noticed during use',
    ],
    nextSteps: [
      'Call to discuss service availability',
      'Confirm assessment arrangements and drop-off details',
      'Agree on the proposed service work',
    ],
  },
  {
    slug: 'fault-finding',
    route: '/services/fault-finding',
    title: 'Fault finding',
    short: 'Not sure what is wrong? Share symptoms and details to start.',
    description:
      'When the cause is unclear, share the symptoms, any warning codes and generator details to start the conversation with Jameric.',
    symptoms: [
      'Intermittent or unclear faults',
      'Warning codes without an obvious cause',
      'Generator behaves inconsistently',
      'You are unsure whether repair or service is needed',
    ],
    prepare: [
      'Generator make, model and kVA rating',
      'Symptom timeline and operating conditions',
      'Any warning codes or error messages',
      'Photos, fault codes or videos',
    ],
    nextSteps: [
      'Call to describe the symptoms',
      'Discuss the next step and assessment arrangements',
      'Agree on the work before it begins',
    ],
  },
];

export const serviceBySlug = (slug: ServiceSlug) =>
  services.find((s) => s.slug === slug);
